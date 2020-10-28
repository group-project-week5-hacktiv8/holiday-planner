const { User } = require('../models')
const jwt = require('jsonwebtoken')

const Authentication = (req, res, next) => {
    console.log(req.headers.access_token);
    const decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
    User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
            if (!user) {
                let err = {
                    msg: 'Unauthorized'
                }
                throw err
            } else {
                req.userData = decoded
                return next()
            }
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = Authentication