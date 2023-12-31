const express = require('express');
const basicAuth = require('basic-auth');
const router = express.Router();
const { sequelize } = require('../../models');
const { Sequelize } = require('sequelize');
const AssignmentModel = require('../../models/assignment.js');
const UserModel = require('../../models/user.js');
const SubmissionModel = require('../../models/submission');
const bcrypt = require('bcrypt');
const validation = require('../service/validation');
const user = require('../../models/user.js');

const logger = require('../../config/logger.js');

const assignController = {};

const Assignments = AssignmentModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Submission = SubmissionModel(sequelize, Sequelize);

// Middleware for Basic Authentication
assignController.authenticateUser = async (req, res, next) => {
  const credentials = basicAuth(req);

  if (!credentials) {
    validation.unauthorized(res, 'Authentication required')
    logger.info(`Authentication required`)
    return;
  }

  // Check the user's credentials against the database
  const { name: email, pass: password } = credentials;
  const user = await User.findOne({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    validation.unauthorized(res, 'Invalid credentials')
    logger.info('Invalid credentials')
    return;
  }
  // Attach the authenticated user to the request
  req.authenticatedUser = user;
  logger.info("User Authenticated")
  next()
};

// Get all assignments
assignController.getAssignments = async (req, res) => {
  try {
    // const assignments = await Assignments.findAll();
    const assignments = await Assignments.findAll({
      // where: { idUser: req.authenticatedUser.id } // Filter by userId
    });
    validation.ok(res, "ok", assignments)
    logger.info("Assignments retrieved")
    // res.status(200).json(assignments);
  } catch (error) {
    validation.serverError(res, 'Error fetching assignments')
    // res.status(500).json({ error: 'Error fetching assignments' });
  }
};

// Get a specific assignment by ID
assignController.getAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await Assignments.findByPk(id);
    if (!assignment) {
      logger.info("Assignment not found")
      return validation.notFound(res, 'Assignment not found')
      // return res.status(404).json({ error: 'Assignment not found' });
    }

    validation.ok(res, "ok", assignment)
    logger.info(`Assignment ${assignment.id} found`)
    // res.status(200).json(assignment);
  } catch (error) {
    validation.serverError(res, 'Error fetching assignments')
  }
};

// Create a new assignment
assignController.createAssignments = async (req, res) => {
  const { name, points, num_of_attempts, deadline, user_id } = req.body;

  // Define the expected fields
  const expectedFields = ['name', 'points', 'num_of_attempts', 'deadline'];

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
    console.log("User ID", req.authenticatedUser.id);

    const newAssignment = await Assignments.create({
      name,
      points,
      num_of_attempts,
      deadline,
      assignment_created: new Date().toISOString(),
      assignment_updated: new Date().toISOString(),
      // idUser: req.authenticatedUser.id,
      user_id: req.authenticatedUser.id

    });

    validation.created(res, "Assignment created", newAssignment)
    logger.info(`Assignments created with id: ${newAssignment.name}`);
    // res.status(201).json(newAssignment);
  } catch (error) {
    logger.info(`Failed to create assignment`)
    console.error('Failed to create assignment', error);
    validation.badRequest(res, 'Failed to create assignment')
    // res.status(400).json({ error: 'Failed to create assignment' });
  }
};

// Update an assignment
assignController.updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { name, points, num_of_attempts, deadline } = req.body;

  const expectedFields = ['name', 'points', 'num_of_attempts', 'deadline'];

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
    // Find the assignment by ID
    const assignment = await Assignments.findByPk(id);

    // Check if the assignment exists
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Check if the user is authorized to update the assignment  

    if (assignment.user_id !== req.authenticatedUser.id) {
      return res.status(403).json({ error: 'Unauthorized to update this assignment' });
    }


    //if submission exists dont update the assignment
    const submissionExists = await Submission.count({
      where: { assignment_id: id }
    });

    if (submissionExists) {
      logger.info(`Submission exists for this assignment`)
      return validation.badRequest(res, `Cannot update as submission exists for this assignment`)
    }


    // Update the assignment fields
    // Update assignment properties based on request body
    assignment.name = name || assignment.name;
    assignment.points = points || assignment.points;
    assignment.num_of_attempts = num_of_attempts || assignment.num_of_attempts;
    assignment.deadline = deadline || assignment.deadline;
    assignment.assignment_updated = new Date().toISOString();

    // Save the updated assignment
    await assignment.save();

    // validation.ok(res, "ok", assignment)
    res.status(204).send(); // No content response
    logger.info(`Assignment Updated ${assignment.id}`)
  } catch (error) {
    validation.badRequest(res, 'Failed to create assignment')
  }
};

// Delete an assignment
assignController.deleteAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the assignment by ID
    const assignment = await Assignments.findByPk(id);

    //if submission exists dont delete the assignment
    const submissionExists = await Submission.count({
      where: { assignment_id: id }
    });

    if (submissionExists) {
      logger.info(`Submission exists for this assignment`)
      return validation.badRequest(res, `Submission exists for this assignment`)
    }

    // Check if the assignment exists
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Check if the user is authorized to delete the assignment 
    if (assignment.user_id !== req.authenticatedUser.id) {
      return res.status(403).json({ error: 'Unauthorized to delete this assignment' });
    }

    // Delete the assignment
    await assignment.destroy();

    res.status(204).send(); // No content response for successful deletion
    logger.info(`Assignment deleted ${assignment.id}`)
  } catch (error) {
    res.status(500).json({ error: 'Error deleting assignment' });
  }
};

module.exports = assignController;
