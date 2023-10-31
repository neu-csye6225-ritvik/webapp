# webapp
Tests
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

- Once  node_modules is installed. create a .env file and add db details and port details.
-   `DB_HOSTNAME = localhost`
-   `DB_PASSWORD = postgres`
-   `DB_USER = postgres`
-   `DB_NAME = postgres`
-   `DB_DIALECT = postgres`
-   `DB_PORT = 5432`
-   `APP_PORT = 7799`
-    Before running a application make sure there 
- since node_modules contains nodemon as well. we can run the server two ways:  `npx nodemon` or `npm start`

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
pulumi destroyß


