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

## PULUMI Code 
pulumi stack select
pulumi up 

aws acm import-certificate --certificate file://Certificate.pem --certificate-chain file://CertificateChain.pem --private-key file://PrivateKey.pem --profile demo
 
