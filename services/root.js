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
  fastify.get("/", async function(request, reply) {
    //trying decorator!!!
    //fastify.User.create({ name: "Abid", email: "abid@eresolute.com" });

    console.log(fastify.User.setPassword("hello"));

    let test = fastify.User.validatePassword("hello");
    console.log(fastify.User.validatePassword("hello"));

    console.log(test === fastify.User.validatePassword("hello"));

    // if (fastify.User.validatePassword("hello!")) {
    //   fastify.log.warn("Password does not match");
    // }

    // if (fastify.User.validatePassword("hello")) {
    //   fastify.log.info("Password matched!");
    // }
    return fastify.someSupport();
    //ends test
  });
};
