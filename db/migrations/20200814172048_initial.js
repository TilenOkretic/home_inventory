const Knex = require('knex');
const table_names = require('../../src/constants/table_names');
const {
    addDefaultColumns,
    createTableName,
    url_column,
    email,
    references
} = require('../../src/lib/utils');

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
        createTableName(knex, table_names.country),
        createTableName(knex, table_names.regija),
        knex.schema.createTable(table_names.inventory_location, (table) => {
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
        table.string('zipcode', 15).notNullable();
        table.double('latitude').notNullable();
        table.double('longitude').notNullable();
        table.unique(['street_address_1', 'city', 'zipcode', 'country_id', 'regija_id']);
        references(table, table_names.regija, false);
        references(table, table_names.country);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(table_names.company, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable();
        url_column(table, 'logo_url');
        table.string('description', 1000);
        url_column(table, 'website_url');
        email(table, 'email');
        references(table, table_names.address)
        addDefaultColumns(table);
    });
};

exports.down = async (knex) => {
    await Promise.all([
        table_names.company,
        table_names.address,
        table_names.user,
        table_names.item_type,
        table_names.country,
        table_names.regija,
        table_names.inventory_location,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName)));
};