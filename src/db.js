const knex = require('knex');

const knex_config = require('../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knex_config[environment];

const connection = knex(connectionConfig);
module.exports = connection;