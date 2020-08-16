const express = require('express');
const Address = require('./address.model');

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const addresses = await Address
            .query()
            .where('deleted_at', null);
        res.json(addresses);
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {
    try {

        ['street_address_1', 'street_address_2', 'city', 'zipcode'].forEach((elm) => {
            if (req.body[elm]) {
                req.body[elm] = req.body[elm].toString().toLowerCase().trim();
            }
        });

        const address = await Address
            .query()
            .insert(req.body)
            .where('deleted_at', null);
        res.json(address);
    } catch (error) {
        next(error);
    }
});

module.exports = router;