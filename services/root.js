"use strict";

// module.exports = function(fastify, opts, next) {
//   fastify.get("/", function(request, reply) {
//     reply.send({ root: true });
//   });

//   next();
// };

//module.exports.autoPrefix = "/v1";

// If you prefer async/await, use the following
//
module.exports = async function(fastify, opts) {
  const Sequelize = require("sequelize");
  const user = require("../models/User");

  fastify.get("/", async function(request, reply) {
    return { root: true };
  });
};
