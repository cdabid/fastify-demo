const fp = require("fastify-plugin");
const Sequelize = require("sequelize");
const crypto = require("crypto");

const Model = Sequelize.Model;

class User extends Model {}

async function user(fastify, __) {
  const sequelize = fastify.db;
  User.init(
    {
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
    },
    {
      sequelize,
      modelName: "user"
    }
  );

  User.sync()
    .then(() => {
      fastify.log.info("users table created");
    })
    .catch(err =>
      fastify.log.error("failed to creat users tables with error: " + err)
    );

  User.setPassword = function(password) {
    this.name = crypto.randomBytes(16).toString("hex");
    let hash = crypto
      .pbkdf2Sync(password, this.name, 1000, 64, `sha512`)
      .toString(`hex`);
    return hash;
  };

  User.validatePassword = function(password) {
    var hash = crypto
      .pbkdf2Sync(password, this.name, 1000, 64, `sha512`)
      .toString(`hex`);

    return this.password === hash;
  };

  fastify.decorate("User", User);
}

module.exports = fp(user);
