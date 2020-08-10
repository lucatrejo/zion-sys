const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('purchases_detail').insert({
    unit_price: 10.10,
    quantity: 1,
    purchase_id: 1,
    item_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('purchases_detail').insert({
    unit_price: 10.10,
    quantity: 1,
    purchase_id: 1,
    item_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  });


  await knex('purchases_detail').insert({
    unit_price: 20.20,
    quantity: 2,
    purchase_id: 2,
    item_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('purchases_detail').insert({
    unit_price: 20.20,
    quantity: 2,
    purchase_id: 2,
    item_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
