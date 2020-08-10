const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('accounts_detail').insert({
    status: 'paid',
    sale_id: 1,
    account_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('accounts_detail').insert({
    status: 'owed',
    sale_id: 2,
    account_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
