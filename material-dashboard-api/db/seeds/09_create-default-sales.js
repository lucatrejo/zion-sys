const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('sales').insert({
    employee_id: 1,
    customer_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('sales').insert({
    employee_id: 2,
    customer_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
