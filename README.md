# webapp

## Built Rest APIs for Student management
1. Student creation on app load
2. Authentication using basic Auth on all endpoints
3. CRUD on Assignments
4. Connected to PostgreSQL, passwords stored Bcrypt
5. API testing - Postman, Documentation - Docee Swagger
6. Nodejs- Backend
7. Expressjs - Routing 
8. Sequelize -ORM
9. logger- logging
10. statsd - Metrics 
11. dotenv - Configuration
12. tests - mocha, supertest

## Github for version Control
1. Organization account - forked repositories for feature updates
2. Branch protection on push & pull - testing purpose
3. Github actions for Integeation and Unit testing
4. gitignore - avoid config files, passwords, .DS store
5. Maintained secrets, variables for Configuration and Actions

## Linux commands environment (Debian) - Virtualization
1. Install require softwore nodejs, npm, PostgreSQL
2. Setup users to with access to application, root access to application is disabled
3. SystemD for autorun, restart on failure, cloudinit

## Раскеr
1. Private AMIs for application enabling ec2 through infrastructure
2. Debian VMs built in Aws account with shared access
3. Packer fmt & validate for unit testing  and Github actions - Packer Build for integration testing
4. SSH-Username, ami-name, instance type, soura-ami-filter build, provisioner -filestell, pre-processors. zip



## Prerequisites softwares and libraries
- Postgres DB
- NodeJS (Version 16.17)
- Sequelize (3rd party package for ORM in Node)
- bcryptjs
- express
- mocha
- pg
- pg-hstore
- sequelize
- supertest
## Steps to deploy it locally.
- clone fork repo:  `git clone git@github.com:ritvikneu/webapp.git`

- run  `npm install` to install packages

- Once  node_modules is installed. create a .env file and add db details and port details.
-   `DB_HOSTNAME = localhost`
-   `DB_PASSWORD = 1234`
-   `DB_USER = postgres`
-   `DB_NAME = postgres`
-   `DB_DIALECT = postgres`
-   `DB_PORT = 5432`
-   `APP_PORT = 7799`
-    Before running a application make sure there 
- since node_modules contains nodemon as well. we can run the server two ways:  `npx nodemon` or `npm start`


## Application Testing
run `npm test` : this runs test on integration-test.js


## Prerequisites softwares and libraries
- Postgres DB
- NodeJS (Version 16.17)
- Sequelize (3rd party package for ORM in Node)
- bcryptjs
- express
- mocha
- pg
- pg-hstore
- sequelize
- supertest
## Steps to deploy it locally.
- clone fork repo:  `git clone git@github.com:ritvikneu/webapp.git`

- run  `npm install` to install packages

## Deploy 

## Application Testing
run `npm test` : this runs test on integration-test.js


## PACKER Setup
packer fmt aws.debian.pkr.hcl
packer validate aws.debian.pkr.hcl
packer build aws.debian.pkr.hcl

# Packer Build on PR Merge

This workflow automates the process of building an AMI using Packer on every push to the `main` branch.

## Steps for Packer build - aws.debian.pkr.hcl

1. **Checkout code:**  The workflow starts by checking out the code from the repository.
2. **Set up environment variables:**  
   - Environment variables are defined in a `.env` file to ensure sensitive data is not stored directly in the workflow file.
   - These include:
     - **NODE_ENV:** The environment the application will run in.
     - **DB_NAME:** The name of the database.
     - **DB_USER:** The username for the database.
     - **DB_PASSWORD:** The password for the database.
     - **DB_PORT:** The port of the database.
     - **DB_HOST:** The hostname of the database server.
     - **DB_DIALECT:** The dialect of the database.
     - **APP_PORT:** The port the application will run on.
     - **AWS_REGION:** The AWS region where the AMI will be built.
     - **PROFILE:** The AWS profile to use.
     - **AMI_DESCRIPTION:** A description for the built AMI.
     - **INSTANCE_TYPE:** The type of EC2 instance to use for building the AMI.
     - **AMI_SOURCE_NAME:** The name of the source volume.
     - **AMI_SOURCE_DEVICE_TYPE:** The type of device for the source volume (e.g., "ebs").
     - **AMI_SOURCE_VIRTUALIZATION:** The virtualization type of the source volume (e.g., "hvm").
     - **DEVICE_NAME:** The name of the device to attach the source volume to.
     - **VOLUME_SIZE:** The size of the volume in GB.
     - **VOLUME_TYPE:** The type of volume (e.g., "gp2").

3. **Zip Web App:** The web app is zipped up for inclusion in the AMI. 
4. **Set up Packer:** The Packer binary is downloaded and installed.
5. **Configure AWS Credentials:** AWS credentials are configured using secrets from the repository.
6. **Run `packer init`:** The Packer configuration file is initialized.
7. **Run `packer build`:** The Packer build process is executed, creating the AMI. 
8. **Launch and Update Auto Scaling Group:** The script updates the Auto Scaling Group to use the newly built AMI:
   - Gets the AMI ID from the Packer output.
   - Creates a new launch template version with the updated AMI.
   - Updates the Auto Scaling Group to use the new launch template version.
   - Starts an instance refresh process, allowing the instances to be replaced with new ones based on the updated launch template.

## Triggering the Workflow

This workflow is triggered on every push to the `main` branch.

## Security Considerations

- **Secret Storage:** Sensitive information like AWS credentials, database credentials, and other environment variables should be stored securely as secrets in your repository.
- **IAM Permissions:** Ensure that the workflow has the necessary IAM permissions to build AMIs, interact with AWS resources, and access secrets.

## Notes

- You may need to adjust the Packer configuration file (`aws.debian.pkr.hcl`) and the workflow steps to suit your specific needs and environment.
- Ensure that the Packer build process is tested thoroughly to verify that the AMI is correctly built and meets your requirements.

 
