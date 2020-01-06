module.exports.user = function(fastify, opts, next) {
  // access to Database
  const DB = fastify.Sequelize["fastify_db_dev"];

  // Defining a new Model
  DB.DefineModel("Users", {
    first_name: DB.Schema.STRING,
    last_name: DB.Schema.STRING,
    email: DB.Schema.STRING,
    password: DB.Schema.STRING
  });

  // access to Model
  const Model = DB.Models.Users;

  // Sample Usage
  Model.create({
    first_name: "John",
    last_name: "Doe",
    email: "john@doe.com",
    password: "123456"
  });
  Model.addHook("afterCreate", "UserCreated", (user, options) => {
    console.log("user created!");
  });
};
