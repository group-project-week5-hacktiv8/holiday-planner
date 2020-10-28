const {User} = require('../models/index');
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UsersController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(data => {
            return res.status(201).json({
                id: data.id,
                email: data.email
            });
        })
        .catch(err => {
            return next(err);
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body;
        const errorMsg = {status: 400, message: 'Invalid Email/Password'}
        User.findOne({
            where: {email}
        })
        .then(user => {
            if (!user || comparePass(password, user.password)) {
                return errorMsg
            }
            return user
        })
        .then(user => {
            const access_token = generateToken(user)
            res.status(200).json({access_token})
        })
        .catch(err => {
            return next(errorMsg)
        })
    }
}

module.exports = UsersController;