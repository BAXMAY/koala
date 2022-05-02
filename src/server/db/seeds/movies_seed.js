/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {
      id: 1, 
      name: 'The Lord of The Rings',
      genre: 'Fantasy',
      rating: 10,
      explicit: false
    },
    {
      id: 2, 
      name: 'Jurassic Park',
      genre: 'Science Fiction',
      rating: 9,
      explicit: true
    },
    {
      id: 3, 
      name: 'Kimetsu no Yaiba',
      genre: 'Action',
      rating: 7,
      explicit: false
    },
  ]);
};
