const express = require('express');
const Item = require('./items.model');

const itemInfos = require('./item_infos/item_infos.routes');

const router = express.Router({
  mergeParams: true,
});

router.use('/:item_id/item_infos', itemInfos);

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

router.get('/:id', async (req, res, next) => {
    try {
        const items = await Item
            .query()
            .where('deleted_at', null).andWhere('id', req.params.id).withGraphFetched('item_infos').first();
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