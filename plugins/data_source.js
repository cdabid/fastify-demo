const fp = require('fastify-plugin');
const Sequelize = require('sequelize');
const AutoLoad = require("fastify-autoload");
const path = require('path');

async function dbConnector(fastify, options) {

    const sequelize = new Sequelize(options);

    let err = await sequelize.authenticate();
    if (err) {
        fastify.log.error("failed to connect to DB");
        fastify.log.error("ERROR: " + err);
    } else {
        fastify.log.info("Database OK");
        fastify.decorate('db', sequelize);

        // Create Sequelize models in './../models' dir
        fastify.register(AutoLoad, {
            dir: path.join(options.rootDir, "models"),
            options: Object.assign({}, {})
        });
    }
}

module.exports = fp(dbConnector);
