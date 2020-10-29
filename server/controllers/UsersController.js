const { User } = require('../models/index');
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UsersController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                if (result) {
                    let err = {
                        msg: 'Email Already Exist'
                    }
                    throw err
                }
                else {
                    return User.create(newUser)
                }
            })
            .then(data => {
                return res.status(201).json({
                    message: 'Register Success',
                    id: data.id,
                    email: data.email
                });
            })
            .catch(err => {
                return next(err);
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: { email }
        })
            .then(user => {
                if (!user || !comparePass(password, user.password)) {
                    return next({
                        name: "BadRequest",
                        message: 'Wrong email/password'
                    })
                } else {
                    let data = {
                        id: user.id,
                        email: user.email
                    }
                    const access_token = generateToken(data)
                    return res.status(200).json({ access_token, message: 'Login Success' })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static GoogleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''
        client.verifyIdToken({
            idToken: req.headers.google_access_token,
            audience: process.env.CLIENT_ID,
        })
            .then(ticket => {
                let payload = ticket.getPayload()
                email = payload.email
                return User.findOne({ where: { email } })
            })
            .then(user => {
                if (!user) {
                    var userObj = {
                        email: email,
                        password: 'randompassword'
                    }
                    return User.create(userObj)
                } else {
                    return user
                }
            })
            .then(user => {
                const access_token = generateToken({ id: user.id, email: user.email })
                return res.status(201).json({ access_token })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = UsersController;