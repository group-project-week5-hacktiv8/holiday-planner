const router = require("express").Router()
const ApiController = require("../controllers/apiController")
const authentication = require('../middlewares/authentication')

routes.use(authentication)
router.get('/holiday', ApiController.getHoliday)
router.post('/airports/:term', ApiController.searchAirport)

module.exports = router