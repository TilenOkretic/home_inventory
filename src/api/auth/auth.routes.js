const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');
const User = require('../users/users.model');
const jwt = require('../../lib/jwt');


const router = express.Router();

const schema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(2)
        .required(),
    email: yup
        .string()
        .trim()
        .email()
        .required(),
    password: yup
        .string()
        .min(8, 'password must be at least 8 characters long')
        .max(100)
        .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
        .matches(/[A-Z]/, 'password must contain an upper case letter')
        .matches(/[a-z]/, 'password must contain a lower case letter')
        .matches(/[0-9]/, 'password must contain a number')
        .required()
})

const error_messages = {
    invalid_login: "Invalid login",
    emailInUse: "Email in use"
}

router.post('/signup', async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;
    try {

        const newUser = {
            name,
            email,
            password,
        };

        await schema.validate(newUser, {
            abortEarly: false
        });

        const exisiting_user = await User.query().where({
            email
        }).first();

        if (exisiting_user) {
            const err = new Error(error_messages.emailInUse);
            res.status(403);
            throw err;
        }

        //TODO: get round from config
        const hashed_password = await bcrypt.hash(password, 12);
        const insertedUser = await User.query().insert({
            name,
            email,
            password: hashed_password,
        });

        delete insertedUser.password;
        const payload = {
            id: insertedUser.id,
            name,
            email,
        };
        const token = await jwt.sign(payload);
        res.json({
            user: payload,
            token
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.post('/signin', async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    try {
        await schema.validate({
            name: "DocD",
            email,
            password
        }, {
            abortEarly: false
        });

        const user = await User.query().where({
            email
        }).first();

        if (!user) {
            const err = new Error(error_messages.invalid_login);
            res.status(403);
            throw err;
        }

        const valid_password = await bcrypt.compare(password, user.password);

        if (!valid_password) {
            const err = new Error(error_messages.invalid_login);
            res.status(403);
            throw err;
        }

        const payload = {
            id: user.id,
            name: user.name,
            email,
        };
        const token = await jwt.sign(payload);
        res.json({
            user: payload,
            token
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
});

module.exports = router;