'use strict';

var config = require('./config');
const request = require('request-promise');

const WEBHOOK_URL = process.env.WEBHOOK_URL;

module.exports.slackMark = async (event, context, callback) => {
  
try{
    const body = JSON.parse(event.body)
    console.log(event.body)
    const url = body.url;
    var hostname = (new URL(url)).hostname;
    if(!config.allowedHostNames.includes(hostname)){
      const errorResponse = {
        isBase64Encoded : false,
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' ,
                'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify({
          errorMessage: "URLs with this domain name are not allowed to be sent on slack. Contact Developer to allow it.",
          errorType: "BAD REQUEST",
          requestId : context.awsRequestId,
        }),
      };
      return callback(null,errorResponse);

    }
    
    const messageSend = await sendToSlack(url)
    .then(response=>{
      const successResponse = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Message sent successfully!"
        }),
      };
      return callback(null, successResponse);

    }).catch(err => {
      let errorJSON = JSON.stringify(err)
      let errorObj = JSON.parse(errorJSON)
      console.log(errorObj.message)
      const errorResponse = {
          isBase64Encoded : false,
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' ,
                'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify({
            errorMessage: errorObj.message,
            errorType: errorObj.name,
            requestId : context.awsRequestId,
          }),
      };
      return callback(null,errorResponse);
      
    });
  }
  catch(err){
    console.log(err.name);
    console.log(err.message);
    const errorResponse = {
      isBase64Encoded : false,
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' ,
                'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({
        errorMessage: err.message,
        errorType: "BAD REQUEST",
        requestId : context.awsRequestId,
      }),
    };
    return callback(null,errorResponse);
  }
};

const sendToSlack = async (url) => {
  const text = [`<${url}>`].join('\n');
  var options = {
      method: 'POST',
      uri: WEBHOOK_URL,
      body: {
          text: text
      },
      json: true // Automatically stringifies the body to JSON
  };
  return request(options)
}

