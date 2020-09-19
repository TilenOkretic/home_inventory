const express = require('express');
const ItemInfo = require('./item_infos.model');

const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const items = await ItemInfo
            .query()
            .where('deleted_at', null);
        res.json(items);
    } catch (error) {
        next(error);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const item = await ItemInfo
            .query()
            .insert(req.body)
            .where('deleted_at', null);
        res.json(item);
    } catch (error) {
        next(error);
    }
});

router.get('/:item_id/item_infos', (req, res, next) => {

});

module.exports = router;