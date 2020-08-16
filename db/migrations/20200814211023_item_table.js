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

    await knex.schema.table(table_names.regija, (table) => {
        table.string('code');
        references(table, table_names.country);
    });
    await knex.schema.table(table_names.country, (table) => {
        table.string('code');
    });


    await knex.schema.createTable(table_names.item, (table) => {
        table.increments();
        references(table, table_names.user);
        table.string('name');
        references(table, table_names.item_type);
        table.text('discrption');
        references(table, table_names.company);
        table.string('sku');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(table_names.item_info, (table) => {
        table.increments();
        references(table, table_names.user);
        references(table, table_names.item);
        table.dateTime('purchase-date').notNullable();
        table.dateTime('experation-date');
        references(table, table_names.company, false, 'retailer')
        table.dateTime('last-used');
        table.float('purchase_price').notNullable().defaultTo(0);
        table.float('msrp').notNullable().defaultTo(0);
        references(table, table_names.inventory_location);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(table_names.item_image, (table) => {
        table.increments();
        references(table, table_names.item);
        url_column(table, 'img_url');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(table_names.related_item, (table) => {
        table.increments();
        references(table, table_names.item);
        references(table, table_names.item, false, 'related_item');
        addDefaultColumns(table);
    });
};

exports.down = async (knex) => {
    await knex.schema.table(table_names.regija, (table) => {
        table.dropColumn('code');
        table.dropColumn('country_id');
    });

    await knex.schema.table(table_names.country, (table) => {
        table.dropColumn('code');
    });

    await Promise.all([
            table_names.item,
            table_names.item_info,
            table_names.item_image,
            table_names.related_item,
        ].reverse()
        .map((name) => knex.schema.dropTableIfExists(name)));
};