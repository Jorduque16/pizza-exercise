'use strict';

const { v4: uuidv4 } = require('uuid');
var AWS = require('aws-sdk');

var sqs = new AWS.SQS({ region: process.env.REGION });
var QUEUE_URL = process.env.PENDING_ORDER_QUEUE;

module.exports.makeAnOrder = (event, context, callback) => {
  const orderId = uuidv4();

  const params = {
    MessageBody: JSON.stringify({orderId: orderId}),
    QueueUrl: QUEUE_URL
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      sendResponse(500, err, callback);
    } else {
      const message = {
          orderId: orderId,
          messageId: data.MessageId
      };
      sendResponse(200, message, callback);
    }
  });
};

function sendResponse(statusCode, message, callback) {
  const response = {
      statusCode: statusCode,
      body: JSON.stringify(message)
  }
  callback(null, response)
}
