```markdown
# Web Application - Student Management System

This repository contains a student management web application built using Node.js, Express.js, and PostgreSQL.

## Features

- **Student Management:**
    - Create, read, update, and delete student records.
    - Authentication using Basic Auth on all endpoints.
- **Assignment Management:**
    - Create, read, update, and delete assignments.
- **Database:**
    - PostgreSQL database to store student and assignment data.
    - Password storage using bcryptjs for security.
- **Testing and Documentation:**
    - API testing using Postman.
    - API documentation generated using Doccee Swagger.
- **Development Tools and Practices:**
    - Node.js - Backend development.
    - Express.js - Routing and handling API requests.
    - Sequelize - ORM for database interactions.
    - Logging with a logger library.
    - Metrics collection using statsd.
    - Configuration using dotenv.
    - Unit testing with mocha and supertest.
- **Version Control:**
    - GitHub for version control and collaboration.
    - Organization account for forked repositories for feature updates.
    - Branch protection for testing purposes.
    - GitHub Actions for integration and unit testing.
    - gitignore to exclude configuration files, passwords, and temporary files.
    - Secrets and variables maintained for configuration and actions.
- **Virtualization and Automation:**
    - Linux environment (Debian) setup for deployment.
    - Installation of necessary software: Node.js, npm, PostgreSQL.
    - User management for restricted access to the application.
    - SystemD for automatic startup and restart on failure.
    - Packer for building AMIs and automating infrastructure deployment.


```

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:ritvikneu/webapp.git
   cd webapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```bash
   touch .env
   ```

4. **Add environment variables:**
   ```
   DB_HOSTNAME=localhost
   DB_PASSWORD=1234
   DB_USER=postgres
   DB_NAME=postgres
   DB_DIALECT=postgres
   DB_PORT=5432
   APP_PORT=7799
   ```

5. **Start the application:**
   ```bash
   npm start
   ```

## Testing

To run tests:

```bash
npm test
```

This will run both integration and unit tests.

## Packer Setup

1. **Format and validate the Packer configuration file:**
   ```bash
   packer fmt aws.debian.pkr.hcl
   packer validate aws.debian.pkr.hcl
   ```

2. **Build the AMI:**
   ```bash
   packer build aws.debian.pkr.hcl
   ```
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
