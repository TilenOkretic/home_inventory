const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');


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

function validatePassword(password, username) {
    return password.toLowerCase() != username.toLowerCase();
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

        const exisiting_user = User.quary().where({
            email
        });

        if (exisiting_user) {
            const err = new Error('Email in use!');
            res.status(409);
            throw err;
        }

        res.json({
            message: 'OKAY'
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.post('/signin', (req, res, next) => {

});

module.exports = router;