const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('items').insert({
    code: 'ASDBS00123',
    category_id: 1,
    name: 'ZAPATILLA NIKE',
    description: 'Zapatilla Nike',
    price: 1250.00,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('items').insert({
    code: 'ASDBS00124',
    category_id: 2,
    name: 'VASOS VIDRIO',
    description: 'Vasos de vidrio',
    price: 150.00,
    created_at: new Date(),
    updated_at: new Date(),
  });
};
