const { User } = require('../models/index');
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

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
                    return res.status(200).json({ access_token })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = UsersController;