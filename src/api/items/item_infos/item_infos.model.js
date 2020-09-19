const {
    Model
} = require('objection');

const table_names = require('../../../constants/table_names');
const schema = require('./item_infos.schema.json');

class ItemInfos extends Model {

    static get tableName(){
        return table_names.item_info;
    }

    static get jsonSchema(){
        return schema;
    }

}


module.exports = ItemInfos;