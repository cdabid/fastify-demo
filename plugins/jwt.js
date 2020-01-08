const fp = require("fastify-plugin");
const { readFileSync } = require("fs");
const path = require("path");

module.exports = fp(async function(fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: {
      private: readFileSync(
        `${path.join(opts.rootDir, "certificates")}/private.pem`,
        "utf8"
      ),
      public: readFileSync(
        `${path.join(opts.rootDir, "certificates")}/public.crt`,
        "utf8"
      )
    },
    sign: { algorithm: "RS256" }
  });

  fastify.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
