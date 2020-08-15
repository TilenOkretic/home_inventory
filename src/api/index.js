const express = require('express');

const states = require('./states/states.routes');
const users = require('./users/users.routes');
const project = require('../constants/project');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: project.message,
    });
})

router.use('/states', states);
router.use('/users', users);



module.exports = router;