const bcrypt = require('bcrypt');

exports.seed = async function seed(knex) {
  await knex('employees').insert({
    name: 'Claudio',
    cuil: '20332123455',
    admission_date: '01/01/2020',
    last_name: 'OConnor',
    identification: '33212345',
    birthdate: '10/11/1991',
    address: 'Derqui 555, Córdoba.',
    created_at: new Date(),
    updated_at: new Date(),
  });

  await knex('employees').insert({
    name: 'Ricardo',
    cuil: '20339874322',
    admission_date: '01/01/2019',
    last_name: 'Mollo',
    identification: '33987432',
    birthdate: '10/11/1980',
    address: 'Salguero 876, Córdoba.',
    created_at: new Date(),
    updated_at: new Date(),
  });
};
