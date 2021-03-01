const {
    Model
} = require('objection');

const table_names = require('../../constants/table_names');
const schema = require('./addresses.schema.json');

class Address extends Model {

    static get tableName(){
        return table_names.address;
    }

    static get jsonSchema(){
        return schema;
    }

}


module.exports = Address;