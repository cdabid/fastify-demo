"use strict";

module.exports = function(fastify, opts, next) {
  const other_opts = {
    schema: {
      querystring: {
        name: { type: "string" },
        excitement: { type: "integer" }
      },
      response: {
        200: {
          type: "object",
          properties: {
            this: { type: "string" }
          }
        }
      }
    }
  };
  fastify.get("/example", other_opts, function(request, reply) {
    reply.send({ this: 123, that: "123" });
  });

  next();
};
// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/example', async function (request, reply) {
//     return 'this is an example'
//   })
// }
