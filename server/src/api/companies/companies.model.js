const {
    Model
} = require('objection');

const table_names = require('../../constants/table_names');

class Company extends Model {

    static get tableName(){
        return table_names.company;
    }

    /*static get jsonSchema(){
        return schema;
    }*/

}


module.exports = Company;