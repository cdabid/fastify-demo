"use strict";

require('make-promises-safe');
const path = require("path");
const AutoLoad = require("fastify-autoload");

module.exports = function (fastify, opts, next) {
    // Place here your custom code!

    opts = Object.assign(opts, {
        dialect: "mysql",
        database: "fastify-demo",
        username: "root",
        password: "toor",
        port: 3306,
        sync: true,
        rootDir: __dirname // save original path. Use this to locate models for Sequelize! Check /plugins/data_source.js
    });

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "plugins"),
        options: Object.assign({}, opts)
    });

    // This loads all plugins defined in services
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "services"),
        options: Object.assign({}, opts)
    });

    // Make sure to call next when done
    next();
};
