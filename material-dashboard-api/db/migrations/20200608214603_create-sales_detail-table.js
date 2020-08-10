exports.up = async function up(knex) {
  await knex.schema.createTable('sales_detail', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['sale_detail_job_pkey']);
      table.decimal('unit_price').notNullable();
      table.integer('quantity').notNullable();

      table.integer('sale_id').unsigned().notNullable();
      table.integer('item_id').unsigned().notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.foreign('sale_id').references('id').inTable('sales');
    table.foreign('item_id').references('id').inTable('items');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('sales_detail');
};
