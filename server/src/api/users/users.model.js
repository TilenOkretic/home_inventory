const {
    Model
} = require('objection');

const table_names = require('../../constants/table_names');
const schema = require('./user.schema.json');

class User extends Model {

    static get tableName(){
        return table_names.user;
    }

    static get jsonSchema(){
        return schema;
    }

}


module.exports = User;