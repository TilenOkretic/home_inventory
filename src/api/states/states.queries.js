const db = require('../../db');
const table_names = require('../../constants/table_names');


module.exports = {
    find() {
        return db(table_names.regija).select('id', 'name', 'code');
    },

    async get(id) {
        return db(table_names.regija).select('id', 'name').where({
            id,
        }).first();
    }
};