"use strict";

//OPTING OUT FROM FASTIFY-CLI

require("dotenv").config();

const Fastify = require("fastify");

// Fastify Config
const app = Fastify({
  logger: true,
  pluginTimeout: 10000,
  onProtoPoisoning: "remove"
});

// Registering application as a normal plugin.
app.register(require("./app.js"));

// Start listening.
app.listen(process.env.PORT || 3000, err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
