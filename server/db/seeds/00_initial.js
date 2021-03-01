const bcrypt = require('bcrypt');
const table_names = require('../../src/constants/table_names');
const ordered_table_names = require('../../src/constants/ordered_table_names');
const countries = require('../../src/constants/countries');
const regije = require('../../src/constants/regije');

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

  if (process.env.NODE_ENV !== 'test') {
    console.log('User created!', created_user);
  }
  const insertedCountries = await knex(table_names.country)
    .insert(countries, '*');

  const slo = insertedCountries.find((country) => country.code === 'SI');

  regije.forEach((state) => {
    state.country_id = slo.id;
  });

  await knex(table_names.regija).insert(regije);

};