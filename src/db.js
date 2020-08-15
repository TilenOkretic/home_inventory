const knex = require('knex');

const knex_config = require('../knexfile');
const env = process.env.NODE_ENV || 'development';
const connect_config = knex_config[env];

const connection = knex(connect_config);

module.exports = connection;