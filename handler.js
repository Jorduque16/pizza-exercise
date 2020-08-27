'use strict';

const { uuid } = require('uuidv4');

module.exports.makeAnOrder = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Your order has been created with id: ${uuid()}`
      },
      null,
      2
    ),
  };
};
