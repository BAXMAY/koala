const bcrypt = require("bcrypt");
const knex = require("../connection");

async function addUser(user) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);
  return knex("users")
    .insert({
      username: user.username,
      password: hash,
    })
    .returning("*");
}

module.exports = {
  addUser,
};
