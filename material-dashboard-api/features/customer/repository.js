const knex = require('../../db');
const logger = require('../../logger');

const TABLE_NAME = 'customers';

async function insert({ name, last_name, identification, birthdate, address }) {
  const columnInfo = await knex(TABLE_NAME).columnInfo();
  const columns = Object.keys(columnInfo);

  const [customer] = await knex(TABLE_NAME)
  .insert({
    name: name,
    last_name: last_name,
    identification: identification,
    birthdate: birthdate,
    address: address
  })
  .returning(columns);
  return customer;
}

async function update({ id, name, last_name, identification, birthdate, address }) {
  const columnInfo = await knex(TABLE_NAME).columnInfo();
  const columns = Object.keys(columnInfo);

  const [customer] = await knex(TABLE_NAME)
    .where({id})
    .update({
      name: name,
      last_name: last_name,
      identification: identification,
      birthdate: birthdate,
      address: address,
      updated_at: new Date(),
    })
    .returning(columns);
  return customer;
}

async function getById(id) {
  const [customer] = await knex(TABLE_NAME)
    .select()
    .where(id)
    .limit(1);
  return customer;
}

async function getAll() {
  const customer = await knex(TABLE_NAME)
    .select();
  return customer;
}

module.exports = {
  insert,
  update,
  getById,
  getAll,
};
