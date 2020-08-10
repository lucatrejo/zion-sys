const knex = require('../../db');
const logger = require('../../logger');

async function insert({ code, name, description, price, stock, category_id }) {
  const columnInfo = await knex('items').columnInfo();
  const columns = Object.keys(columnInfo);

  const [item] = await knex('items')
  .insert({
    code: code,
    name: name,
    description: description,
    price: price,
    stock: stock,
    category_id: category_id
  })
  .returning(columns);
  return item;
}

async function update({ id, code, name, description, price, stock, category_id }) {
  const columnInfo = await knex('items').columnInfo();
  const columns = Object.keys(columnInfo);

  const [item] = await knex('items')
    .where({id})
    .update({
      code: code,
      name: name,
      description: description,
      price: price,
      stock: stock,
      category_id: category_id,
      updated_at: new Date(),
    })
    .returning(columns);
  return item;
}

async function getById(id) {
  const [item] = await knex('items')
    .select()
    .where(id)
    .limit(1);
  return item;
}

async function getAll() {
  const items = await knex('items')
    .join('categories', 'categories.id', 'items.category_id')
    .select(['items.id', 'items.code', 'items.name', 'items.description', 'items.price', 'items.stock', {catgegory: 'categories.name'}]);
  return items;
}

module.exports = {
  insert,
  update,
  getById,
  getAll,
};
