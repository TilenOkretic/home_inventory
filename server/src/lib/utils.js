function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.datetime('deleted_at');
}

async function createTableName(knex, tn) {
    return knex.schema.createTable(tn, (table) => {
        table.increments().notNullable();
        table.string('name').notNullable().unique();
        addDefaultColumns(table);
    });
}

function references(table, tableName, notNullable = true, columnName = '') {
    const definition = table
        .integer(`${columnName || tableName}_id`)
        .unsigned()
        .references('id')
        .inTable(tableName)
        .onDelete('cascade');

    if (notNullable) {
        definition.notNullable();
    }
    return definition;
}

function url_column(table, columnName) {
    table.string(columnName, 2000);
}

function email(table, columnName) {
    return table.string(columnName, 254);
}

module.exports = {
    addDefaultColumns,
    createTableName,
    url_column,
    email,
    references
};