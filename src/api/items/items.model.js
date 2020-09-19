const {
    Model
} = require('objection');

const table_names = require('../../constants/table_names');
const schema = require('./items.schema.json');

const ItemInfo = require('./item_infos/item_infos.model');

class Item extends Model {

    static get tableName() {
        return table_names.item;
    }

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        return {
            item_infos: {
                relation: Model.HasManyRelation,
                modelClass: ItemInfo,
                join: {
                    from: `${table_names.item}.id`,
                    to: `${table_names.item_info}.item_id`
                }
            }
        };
    }
}


module.exports = Item;