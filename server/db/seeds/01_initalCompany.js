const Knex = require('knex');
const table_names = require('../../src/constants/table_names');


/**
 * @param {Knex} knex 
 */
exports.seed = async (knex) => {

    const [lj, slo] = await Promise.all([knex(table_names.regija).where({
        code: 'SI021'
    }).first(), knex(table_names.country).where({
        code: 'SI'
    }).first()]);

    const [address_id] = await knex(table_names.address).insert({
        street_address_1: "Pivovarniška ulica 2",
        zipcode: "1000",
        city: "Ljubljana ",
        regija_id: lj.id,
        country_id: slo.id,
        latitude: 46.060180,
        longitude: 14.500580
    }).returning('id');

    await knex(table_names.company).insert({
        name: 'Sola',
        logo_url: 'https://i.imgur.com/0gI3HpT.jpg',
        description: 'Ena najbolj priljubljenih pijač, ki je osvežila in s tem osvojila še vsako dosedanjo generacijo. S svojim polnim okusom, ki bi ga prepoznali tudi v miže sredi noči, navdušuje vse, nagnjene k reševanju najrazličnejših izzivov. Sliši se logično, saj poleg negazirane izjemnosti vsebuje mešanico breskovega soka, naravni izvleček šipka in črnega čaja. Seveda pa v njem ni prostora za konzervanse in jamranje. Navdušuje v pločevinki ali plastenkah različnih velikosti. Odvisno od žeje.',
        website_url: 'https://www.sola.si/',
        email: 'info.plu@heineken.com',
        address_id
    });

    await knex(table_names.item_type).insert({
        name: "Brezalkoholne Pijace",
    });

    await knex(table_names.inventory_location).insert([{
        name: "Shramba pri racunalniku",
    },
    {
        name: "Kuhinja",
    },
    {
        name: "Skrinja stara",
    },
    {
        name: "Skrinja nova",
    }])
};