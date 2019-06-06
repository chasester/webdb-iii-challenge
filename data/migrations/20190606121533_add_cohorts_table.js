
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        // primary key
        tbl.increments('id'); // or bigIncrements
        tbl
        tbl.string('name', 128).notNullable(); // .defaultTo('n/a')
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {return knex.schema.dropTableIfExists('cohorts');};
