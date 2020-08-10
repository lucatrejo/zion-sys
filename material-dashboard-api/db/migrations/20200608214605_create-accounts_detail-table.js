exports.up = async function up(knex) {
  await knex.schema.createTable('accounts_detail', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['account_detail_job_pkey']);
      table.integer('account_id').unsigned().notNullable();
      table.integer('sale_id').unsigned().notNullable();
      table.string('status');
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.foreign('account_id').references('id').inTable('accounts');
    table.foreign('sale_id').references('id').inTable('sales');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('accounts_detail');
};
