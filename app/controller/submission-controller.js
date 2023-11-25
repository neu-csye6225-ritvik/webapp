const express = require('express');
const router = express.Router();
const { sequelize } = require('../../models');
const { Sequelize } = require('sequelize');
const SubmissionModel = require('../../models/submission');
const AssignmentModel = require('../../models/assignment.js');
const UserModel = require('../../models/user.js');
const validation = require('../service/validation');

const user = require('../../models/user.js');
const logger = require('../../config/logger.js');


require('dotenv').config();

const submissionController = {};

const Submission = SubmissionModel(sequelize, Sequelize);
const Assignments = AssignmentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

const snsTopicArn = process.env.SNSTOPICARN;
const aws_region = process.env.AWS_REGION
const aws_profile = process.env.AWS_PROFILE

const AWS = require('aws-sdk');
// const aws_cred = new AWS.SharedIniFileCredentials({ profile: aws_profile });
// AWS.config.credentials = aws_cred;
// logger.info(AWS.config.credentials);

submissionController.getSubmission = async (req, res) => {
    try {
        const { id } = req.params;
        validation.ok(res, "ok", req.params.id)
        console.log(req.params)
        logger.info("submission retrieved")
        logger.info(req.params)
        // res.status(200).json(assignments);
    } catch (error) {
        validation.serverError(res, 'Error fetching submission')
        // res.status(500).json({ error: 'Error fetching assignments' });
    }
};

// Create a submission on assignment
submissionController.createSubmission = async (req, res) => {
    const assignment_id = req.params.id;
    const { submission_url } = req.body;

    // Define the expected fields
    const expectedFields = ['submission_url'];

    // Validate fields in the request body
    const { missingFields, extraFields } = validation.validateFields(req.body, expectedFields);

    if (missingFields.length > 0 || extraFields.length > 0) {
        logger.info(`Invalid/Missing fields: ${[...missingFields, ...extraFields].join(', ')}`)
        validation.badRequest(
            res,
            `Invalid/Missing fields: ${[...missingFields, ...extraFields].join(', ')}`
        );
        return;
    }
    try {

        // Fetch the assignment to get the number of attempts
        const assignment = await Assignments.findByPk(assignment_id);

        if (!assignment) {
            return validation.notFound(res, 'Assignment not found');
        }

        const id = req.authenticatedUser.id;
        const user = await User.findOne({ where: { id } });
        logger.info(`USER DETAILS${user.email}`)

        if (assignment.user_id !== user.id) {
            return res.status(403).json({ error: 'Unauthorized to update this assignment' });
        }

        // Check if the maximum number of attempts has been reached
        if (assignment.num_of_attempts <= 0) {
            return validation.badRequest(res, 'Maximum attempts reached for this assignment');
        }

        // Check if the current attempts are less than the maximum allowed
        const currentAttempts = await Submission.count({
            where: { assignment_id: assignment_id }
        });

        // Check if the assignment has passed its deadline
        const now = new Date();
        const deadline = new Date(assignment.deadline);

        if (now > deadline) {
            return validation.badRequest(res, 'Assignment deadline has passed');
        }


        const newSubmission = await Submission.create({
            assignment_id: assignment_id,
            submission_url,
            submission_date: new Date().toISOString(),
            assignment_updated: new Date().toISOString()
        });

        const submissionObject = {
            submission_url: submission_url,
            email: user.email
        }
      
        logger.info(JSON.stringify(submissionObject));
        
        // Post submission URL to dynamically retrieved SNS topic ARN
        const sns = new AWS.SNS({ region: aws_region }); // Replace with your AWS region
        const snsParams = {
            TopicArn: snsTopicArn,
            Message: JSON.stringify(submissionObject)
        };

        sns.publish(snsParams, (err, data) => {
            if (err) {
                logger.error('Error publishing to SNS:', err);
            } else {
                logger.info('Submission URL sent to SNS successfully:', data);
            }
        });


        validation.created(res, "Submission created", newSubmission)
        logger.info(`Submission created with id: ${newSubmission.id}`);

        // res.status(201).json(newAssignment);
    } catch (error) {
        validation.badRequest(res, 'Failed to create submission')
        logger.info(`Failed to create submission`)
        console.error('Failed to create submission', error);
        // res.status(400).json({ error: 'Failed to create assignment' });
    }
};

module.exports = submissionController;