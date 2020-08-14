const Knex = require('knex');
const table_names = require('../../src/constants/table_names');

function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.datetime('deleted_at').notNullable();
}

async function createTableName(knex, tn) {
    return await knex.schema.createTable(tn, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable().unique();
        addDefaultColumns(table);
    });
}

function references(table, tableName) {
    table
        .integer(`${tableName}_id`)
        .unsigned()
        .references('id')
        .inTable(tableName)
        .onDelete('cascade');
}

function url_column(table, columnName) {
    table.string(columnName, 2000);
}

function email(table, columnName) {
    return table.string(columnName, 254);
}

/**
 * @param {Knex} knex 
 */

exports.up = async (knex) => {

    await Promise.all([
        knex.schema.createTable(table_names.user, (table) => {
            table.increments().notNullable();
            email(table, 'email').notNullable().unique();
            table.string('name', 254).notNullable();
            table.string('password', 127).notNullable();
            table.datetime('last_login');
            addDefaultColumns(table);
        }),
        createTableName(knex, table_names.item_type),
        createTableName(knex, table_names.state),
        createTableName(knex, table_names.country),
        knex.schema.createTable(table_names.location, (table) => {
            table.increments().notNullable();
            table.string('name').notNullable().unique();
            table.string('description', 1000);
            url_column(table, 'img_url');
            addDefaultColumns(table);
        }),
    ]);


    await knex.schema.createTable(table_names.address, (table) => {
        table.increments().notNullable();
        table.string('street_address_1', 100).notNullable();
        table.string('street_address_2', 100);
        table.string('city', 50).notNullable();
        table.string('zipCode', 15).notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
        references(table, table_names.state);
        references(table, table_names.country);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(table_names.manufacturer, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
        url_column(table, 'logo_url');
        table.string('description', 1000);
        url_column(table, 'website_url');
        email(table, 'email');
        references(table, table_names.address)


        table.string('street_address_2', 100);
        table.string('city', 50).notNullable();
        table.string('zipCode', 15).notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
        references(table, table_names.state);
        references(table, table_names.country);
        addDefaultColumns(table);
    });
};

exports.down = async (knex) => {
    await Promise.all([
        table_names.manufacturer,
        table_names.address,
        table_names.user,
        table_names.item_type,
        table_names.country,
        table_names.location,
        table_names.state,
    ].map((tableName) => knex.schema.dropTable(tableName)));
};