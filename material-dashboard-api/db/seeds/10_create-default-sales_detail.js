const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('sales_detail').insert({
    unit_price: 10.10,
    quantity: 1,
    sale_id: 1,
    item_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('sales_detail').insert({
    unit_price: 20.20,
    quantity: 2,
    sale_id: 2,
    item_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
