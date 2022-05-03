const knex = require("../connection");

function getAllMovies() {
  return knex("movies").select("*");
}

function getSingleMovie(id) {
  return knex("movies")
    .select("*")
    .where({ id: parseInt(id) });
}

function addMovie(movie) {
  return knex("movies").insert(movie).returning("*");
}

function updateMovie(movieId, movieData) {
  return knex("movies")
    .update(movieData)
    .where({ id: parseInt(movieId) })
    .returning("*");
}

function deleteMovie(movieId) {
  return knex("movies")
    .del()
    .where({ id: parseInt(movieId) })
    .returning("*");
}

module.exports = {
  getAllMovies,
  getSingleMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
