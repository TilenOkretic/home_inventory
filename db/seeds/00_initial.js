const bcrypt = require('bcrypt');
const table_names = require('../../src/constants/table_names');
const ordered_table_names = require('../../src/constants/ordered_table_names');
const countries = require('../../src/constants/countries');

exports.seed = async (knex) => {

  await ordered_table_names
    .reduce(async (promise, table_name) => {
      await promise;

      console.log('Clearing!', table_name);

      return knex(table_name).del()
    }, Promise.resolve());


  const user = {
    email: 'tilen.okretic@gmail.com',
    name: 'Tilen',
    password: await bcrypt.hash('milkoNeboFuku', 12),
  };

  const [created_user] = await knex(table_names.user).insert(user).returning('*');

  console.log('User created!', created_user);

  await knex(table_names.country).insert(countries);

  await knex(table_names.state).insert([{
    name: 'KRAS'
  }, ]);

};