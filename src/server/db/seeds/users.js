const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const salt = bcrypt.genSalt();
  const hash = bcrypt.hash("admin", salt);

  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([{ username: "baramee", password: hash }]);
};
