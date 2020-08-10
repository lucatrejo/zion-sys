exports.up = async function up(knex) {
  await knex.schema.createTable('items', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['item_job_pkey']);
    table.string('code', 60);
    table.string('name', 20).notNullable();
    table.string('description', 60).notNullable();
    table.decimal('price').notNullable();
    table.bigInteger('stock').defaultTo(0);
    table.integer('category_id').unsigned().notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique('name');
    table.foreign('category_id').references('id').inTable('categories');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('items');
};
