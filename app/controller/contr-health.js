
const response  = require('express');

const {sequelize} = require('/Users/ritvikparamkusham/Documents/Courses/Cloud Computing/Assignment2/models');


var healthController = {}

healthController.handleHealthRequest = function (request, response) {
  response.setHeader('Cache-Control', 'no-cache')
  response.header('Cache-Control', 'no-cache');
  try {
    const method = request.method;
    if (method === 'GET') {
      get(request, response);
    } else// Handle different HTTP methods
    {
      response.status(405).json();
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

const get = async (request, response, err) => {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    rejectPayload(request, response);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    setErrorResponse(response, err);
  });
  // setSuccessfulResponse(response,"success")
}

const setSuccessfulResponse = (response, message) => {
  response.status(200);
  response.json()
}

const setErrorResponse = (response, err) => {
  response.status(503); // Use 503 for Service Unavailable
  response.json();
}

const rejectPayload = (request, response) => {
  //check for request body and query parameters
  if( (request.body && Object.keys(request.body).length > 0) ||  (request.query && Object.keys(request.query).length > 0) ){
    response.status(400).json();
  } else {
    console.log("Reject Payload: Content-length = 0")
    setSuccessfulResponse(response, "success");
  }
};


module.exports = healthController;