exports.up = async function up(knex) {
  await knex.schema.createTable('purchases', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['purchase_job_pkey']);
      table.integer('employee_id').unsigned().notNullable();
      table.integer('provider_id').unsigned().notNullable();
      table.timestamp('date').notNullable().defaultTo(knex.fn.now());
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.foreign('employee_id').references('id').inTable('employees');
    table.foreign('provider_id').references('id').inTable('providers');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('purchases');
};
