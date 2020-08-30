const {
    Model
} = require('objection');

const table_names = require('../../constants/table_names');
const schema = require('./items.schema.json');

class Item extends Model {

    static get tableName(){
        return table_names.item;
    }

    static get jsonSchema(){
        return schema;
    }

}


module.exports = Item;