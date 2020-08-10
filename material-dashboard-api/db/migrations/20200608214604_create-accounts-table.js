exports.up = async function up(knex) {
  await knex.schema.createTable('accounts', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['account_job_pkey']);

      table.decimal('amount').notNullable();
      table.string('status');
      table.integer('customer_id').unsigned().notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.foreign('customer_id').references('id').inTable('customers');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('accounts');
};
