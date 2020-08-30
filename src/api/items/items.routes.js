const express = require('express');
const Item = require('./items.model');

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const items = await Item
            .query()
            .where('deleted_at', null);
        res.json(items);
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const item = await Item
            .query()
            .insert(req.body)
            .where('deleted_at', null);
        res.json(item);
    } catch (error) {
        next(error);
    }
});

module.exports = router;