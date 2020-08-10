const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('providers').insert({
    name: 'Marcas',
    business_name: 'Marcas SRL',
    description: 'Indumentaria Deportivs',
    address: 'Buenos Aires 383, Córdoba.',
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('providers').insert({
    name: 'Popeye',
    business_name: 'Popeye SA',
    description: 'Bazar',
    address: 'Ituzaingó 411, Córdoba.',
    created_at: new Date(),
    updated_at: new Date(),
  });
};
