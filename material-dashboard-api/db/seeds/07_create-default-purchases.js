const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('purchases').insert({
    employee_id: 1,
    provider_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('purchases').insert({
    employee_id: 2,
    provider_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
