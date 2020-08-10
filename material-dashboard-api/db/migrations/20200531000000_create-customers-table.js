exports.up = async function up(knex) {
  await knex.schema.createTable('customers', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['customer_job_pkey']);
    table.string('name', 55).notNullable();
    table.string('last_name', 55).notNullable();
    table.string('identification', 30);
    table.string('birthdate', 30);
    table.string('address', 55);
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('customers');
};
