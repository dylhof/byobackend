
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cities', (table) => {
      table.increments('id').primary();
      table.string('city_name');
      table.integer('avg_may_high');
      table.integer('avg_may_low');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('attractions', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('link');
      table.integer('city_id').unsigned();
      table.foreign('city_id').references('cities.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cities'),
    knex.schema.dropTable('attractions')
  ]);
};
