const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('accounts').insert({
    amount: 10.10,
    status: 'up_to_date',
    customer_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('accounts').insert({
    amount: 40.40,
    status: 'debtor',
    customer_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
