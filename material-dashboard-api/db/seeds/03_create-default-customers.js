const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('customers').insert({
    name: 'Luca',
    last_name: 'Trejo',
    identification: '33672209',
    birthdate: '10/11/1989',
    address: 'Av. Poeta Lugones 11, Córdoba.',
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('customers').insert({
    name: 'Ricardo',
    last_name: 'Iorio',
    identification: '31674509',
    birthdate: '10/11/1991',
    address: 'Av. Poeta Lugones 11, Córdoba.',
    created_at: new Date(),
    updated_at: new Date(),
  });
};
