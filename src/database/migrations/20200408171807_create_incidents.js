//CREATE TABLE
exports.up = function (knex) {

    return knex.schema.createTable('incedents', function (table) {

        table.increments();//gera um id autoIncrement

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();//id da ong

        table.foreign('ong_id').references('id').inTable('ongs');//chave estrangeira da ong.


    });

};
//DROP TABLE
exports.down = function (knex) {

    return knex.schema.dropTable('incidents');

};
