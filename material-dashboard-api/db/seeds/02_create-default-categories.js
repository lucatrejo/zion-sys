const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('categories').insert({
    name: 'Indumentaria',
    description: 'Indumentaria en general',
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('categories').insert({
    name: 'Bazar',
    description: 'Bazar en general',
    created_at: new Date(),
    updated_at: new Date(),
  });
};
