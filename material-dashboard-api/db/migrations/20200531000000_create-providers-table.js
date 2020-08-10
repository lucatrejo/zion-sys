exports.up = async function up(knex) {
  await knex.schema.createTable('providers', table => {
    table
      .increments('id')
      .unsigned()
      .notNullable()
      .primary(['provider_job_pkey']);
    table.string('name', 55).notNullable();
    table.string('business_name', 55).notNullable();
    table.string('description');
    table.string('address', 55);
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
  await knex.schema.dropTable('providers');
};
