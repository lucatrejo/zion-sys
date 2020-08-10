const knex = require('../../db');
const logger = require('../../logger');

const TABLE_NAME = 'employees';

async function insert({ name, cuil, admission_date, last_name, identification, birthdate, address }) {
  const columnInfo = await knex(TABLE_NAME).columnInfo();
  const columns = Object.keys(columnInfo);

  const [employee] = await knex(TABLE_NAME)
  .insert({
    name: name,
    cuil: cuil,
    admission_date: admission_date,
    last_name: last_name,
    identification: identification,
    birthdate: birthdate,
    address: address
  })
  .returning(columns);
  return employee;
}

async function update({ id, name, cuil, admission_date, last_name, identification, birthdate, address }) {
  const columnInfo = await knex(TABLE_NAME).columnInfo();
  const columns = Object.keys(columnInfo);

  const [employee] = await knex(TABLE_NAME)
    .where({id})
    .update({
      name: name,
      cuil: cuil,
      admission_date: admission_date,
      last_name: last_name,
      identification: identification,
      birthdate: birthdate,
      address: address,
      updated_at: new Date(),
    })
    .returning(columns);
  return employee;
}

async function getById(id) {
  const [employee] = await knex(TABLE_NAME)
    .select()
    .where(id)
    .limit(1);
  return employee;
}

async function getAll() {
  const employees = await knex(TABLE_NAME)
    .select(['id', 'name', 'last_name', 'cuil', 'identification', 'birthdate', 'address', 'admission_date']);
  return employees;
}

module.exports = {
  insert,
  update,
  getById,
  getAll,
};
