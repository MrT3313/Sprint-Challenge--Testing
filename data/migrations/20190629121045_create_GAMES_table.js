exports.up = function(knex) {
  return knex.schema.createTable('GAMES', tbl => {
    tbl.increments('id')
    tbl.string('title')
        .notNullable()
    tbl.string('genre')
        .notNullable()
    tbl.integer('releaseYear')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('GAMES')
};
