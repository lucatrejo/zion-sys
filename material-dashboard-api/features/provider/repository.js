const knex = require('../../db');
const logger = require('../../logger');

const TABLE_NAME = 'providers';

async function insert({ name, business_name, description, address }) {
  const columnInfo = await knex(TABLE_NAME).columnInfo();
  const columns = Object.keys(columnInfo);

  const [provider] = await knex(TABLE_NAME)
  .insert({
    name: name,
    business_name: business_name,
    description: description,
    address: address
  })
  .returning(columns);
  return provider;
}

async function update({ id, name, business_name, description, address }) {
  const columnInfo = await knex(TABLE_NAME).columnInfo();
  const columns = Object.keys(columnInfo);

  const [provider] = await knex(TABLE_NAME)
    .where({id})
    .update({
      name: name,
      business_name: business_name,
      description: description,
      address: address,
      updated_at: new Date(),
    })
    .returning(columns);
  return provider;
}

async function getById(id) {
  const [provider] = await knex(TABLE_NAME)
    .select()
    .where(id)
    .limit(1);
  return provider;
}

async function getAll() {
  const providers = await knex(TABLE_NAME)
    .select(['id', 'name', 'business_name', 'description', 'address']);
  return providers;
}

module.exports = {
  insert,
  update,
  getById,
  getAll,
};
