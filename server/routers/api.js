const router = require("express").Router()
const ApiController = require("../controllers/apiController")
const authentication = require('../middlewares/authentication')

// router.use(authentication)
router.get('/holiday', ApiController.getHoliday)
router.get('/flights', ApiController.getFlight)
router.get('/corona', ApiController.getCorona)
router.get('/picture', ApiController.getPicture)
router.post('/airports/:term', ApiController.searchAirport)

module.exports = router