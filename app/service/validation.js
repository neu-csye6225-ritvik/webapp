// validation.js

const validateFields = (obj, expectedFields) => {
  const receivedFields = Object.keys(obj);
  const missingFields = expectedFields.filter(
    (field) => !receivedFields.includes(field)
  );
  const extraFields = receivedFields.filter(
    (field) => !expectedFields.includes(field)
  );

  return { missingFields, extraFields };
};

const rejectPayload = (request, response,next) => {
  //check for request body and query parameters
  if( (request.body && Object.keys(request.body).length > 0) ||  (request.query && Object.keys(request.query).length > 0) ){
    response.status(400).json("Check Payload");
  } else{
    next();
  }
};

const queryParams = (request, response,next) => {
  //check for request body and query parameters
  if (request.query && Object.keys(request.query).length > 0){
    response.status(400).json("Query parameters not allowed");
  } else{
    next();
  }
};

const patchmethod = (request,response) => {
  response.status(405).json("Method not allowed");
}

// Function to send a 401 - Unauthorized response
const unauthorized = (res, message) => {
    res.status(401).json({ error: message });
  };
  
  // Function to send a 403 - Forbidden response
  const forbidden = (res, message) => {
    res.status(403).json({ error: message });
  };
  
  // Function to send a 400 - Bad Request response
  const badRequest = (res, message) => {
    res.status(400).json({ error: message });
  };

  
  // Function to send a 200 - OK response with data
  const ok = (res, message,data = {},) => {
    res.status(200).json({ message, data });
  };
  
  // Function to send a 201 - Created response with data
  const created = (res, message,data = {}) => {
    res.status(201).json({ message, data });
  };
  
  // Function to send a 204 - No Content response
  const noContent = (res) => {
    res.status(204).end();
  };
  
  // Function to send a 404 - Not Found response
  const notFound = (res, message = 'Not Found') => {
    res.status(404).json({ error: message });
  };

  const serverError = (res,message) =>{
    res.status(500).json({message})
}  
  module.exports = {
    unauthorized,
    forbidden,
    badRequest,
    ok,
    created,
    noContent,
    notFound,
    serverError,
    validateFields,
    rejectPayload,
    patchmethod,
    queryParams
  };
  