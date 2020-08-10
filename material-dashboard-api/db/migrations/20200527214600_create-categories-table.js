exports.up = async function up(knex) {
  await knex.schema.createTable('categories', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['category_job_pkey']);
    table.string('name', 20).notNullable();
    table.string('description', 60).notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.unique('name');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('categories');
};
