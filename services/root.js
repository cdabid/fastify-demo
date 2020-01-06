"use strict";

module.exports = function(fastify, opts, next) {
  fastify.get("/", function(request, reply) {
    const user = require("../models/model");
    user.user();
    reply.send({ root: true });
  });

  next();
};

//module.exports.autoPrefix = "/v1";

// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/', async function (request, reply) {
//     return { root: true }
//   })
// }
