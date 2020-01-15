const fp = require("fastify-plugin");
const Bearer = require("permit").Bearer;

module.exports = fp(async function(fastify, opts) {
  fastify.decorateRequest("user", null);

  const permit = new Bearer({
    basic: "username" // Also allow a Basic Auth username as a token.
  });

  fastify
    .decorate("verifyCredentials", async function(request, reply) {
      // your async validation logic
      //await validation();
      fastify.log.warn("authenticated!");
      // throws an error if the authentication fails
    })
    .decorate("verifyJWT", async function(request, reply) {
      // return a promise that throws an error if the authentication fails
      return myPromiseValidation();
    })
    .decorate("permit", async function(request, reply) {
      // Try to find the bearer token in the request.
      const token = permit.check(request.raw);

      // No token found, so ask for authentication.
      if (!token) {
        permit.fail(reply.res);
        throw new Error("Authentication required!");
      }

      // Perform your authentication logic however you'd like...
      const user = { username: "abid", role: "admin" }; //await db.users.findByToken(token)

      // // No user found, so their token was invalid.
      // if (!user) {
      //   permit.fail(reply.res)
      //   throw new Error('Authentication invalid!')
      // }

      // Authentication succeeded, save the context and proceed...
      request.user = user;
    })
    .register(require("fastify-auth"));
});
