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

    //create user table
    //fastify.User.create({ name: "Abid", email: "abid@eresolute.com" });

    //CHECKING PASSWORD HASHING
    console.log(fastify.User.setPassword("hello"));

    //let test = fastify.User.validatePassword("hello");
    console.log(fastify.User.validatePassword("hello"));

    // console.log(test === fastify.User.validatePassword("hello"));

    //ENCRYPTION USING CERTIFICATES!
    let generate = fastify.encrypt("hello");
    console.log(generate);
    let check = fastify.decrypt(generate);
    fastify.log.warn(check);

    return fastify.someSupport();
    //ends test
  });

  fastify.get("/auth", async function(request, reply) {
    let payload = {
      sub: "327241123",
      name: "Abid Rashid",
      admin: true
    };
    const token = fastify.jwt.sign(payload);
    reply.send({ token });
  });

  fastify.get(
    "/validate",
    {
      preValidation: [fastify.authenticate]
    },
    async function(request, reply) {
      return request.user;
    }
  );
};
