const fp = require('fastify-plugin');
const Sequelize = require('sequelize');

const Model = Sequelize.Model;

class User extends Model {
}

async function user(fastify, __) {

    const sequelize = fastify.db;

    User.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'user'
    });

    User.sync().then(() => {
        fastify.log.info("users table created");
    }).catch(err => fastify.log.error("failed to creat users tables with error: " + err));
}

module.exports = fp(user);
