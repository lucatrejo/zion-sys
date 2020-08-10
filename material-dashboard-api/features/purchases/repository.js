const knex = require('../../db');
const logger = require('../../logger');

const TABLE_NAME = 'purchases';
const TABLE_NAME_DETAIL = 'purchases_detail';

async function insert({ employee_id, provider_id }) {
  const columnInfo = await knex(TABLE_NAME).columnInfo();
  const columns = Object.keys(columnInfo);

  const [purchase] = await knex(TABLE_NAME)
  .insert({
    employee_id: employee_id,
    provider_id: provider_id,
  })
  .returning(columns);
  return purchase;
}

async function insertDetail(purchase_id, item_id, unit_price, quantity) {
  const columnInfo = await knex(TABLE_NAME_DETAIL).columnInfo();
  const columns = Object.keys(columnInfo);

  const [purchase_detail] = await knex(TABLE_NAME_DETAIL)
  .insert({
    purchase_id: purchase_id,
    item_id: item_id,
    unit_price: unit_price,
    quantity: quantity,
  })
  .returning(columns);
  return purchase_detail;
}

async function update({ id, employee_id, provider_id }) {
  const columnInfo = await knex(TABLE_NAME).columnInfo();
  const columns = Object.keys(columnInfo);

  const [purchase] = await knex(TABLE_NAME)
    .where({id})
    .update({
      employee_id: employee_id,
      provider_id: provider_id,
      updated_at: new Date(),
    })
    .returning(columns);
  return purchase;
}

async function updateDetail({ id, purchase_id, item_id, unit_price, quantity }) {
  const columnInfo = await knex(TABLE_NAME_DETAIL).columnInfo();
  const columns = Object.keys(columnInfo);

  const [purchase] = await knex(TABLE_NAME)
    .where({id})
    .update({
      purchase_id: purchase_id,
      item_id: item_id,
      unit_price: unit_price,
      quantity: quantity,
      updated_at: new Date(),
    })
    .returning(columns);
  return purchase;
}

async function getById(id) {
  const [provider] = await knex(TABLE_NAME)
    .select()
    .where(id)
    .limit(1);
  return provider;
}

async function getAll() {
  const purchases = await knex(TABLE_NAME)
    .join('employees', 'purchases.employee_id', 'employees.id')
    .join('providers', 'purchases.provider_id', 'providers.id')
    .select('purchases.id', {employee_name:  'employees.name'},  {employee_last_name: 'employees.last_name'}, {provider: 'providers.name'}, 'purchases.date');
  return purchases;
}

async function getDetailById(id) {
  const details = await knex('purchases_detail')
    .join('items', 'purchases_detail.item_id', 'items.id')
    .where({purchase_id: id})
    .select(['purchases_detail.id', 'items.name', 'purchases_detail.unit_price', 'purchases_detail.quantity']);

    return details;
}

module.exports = {
  insert,
  insertDetail,
  update,
  getById,
  getAll,
  getDetailById
};
