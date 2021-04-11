var express = require('express')
var router = express.Router()

var starFlowController = require('../controllers/starflowControllerJar86.js')
// var weatherController = require('../controllers/weatherControllerJar86.js')

router.get('/tenants', starFlowController.getTenantListJar86)
router.post('/tenants', starFlowController.updateProfile)

router.get('/todolist', starFlowController.getTodoList)
router.post('/todolist', starFlowController.addTodo)

router.get('/health', starFlowController.getHealtWellness)
router.post('/health', starFlowController.addHealth)
router.get('/health/report', starFlowController.getHealthReport)

router.get('/incident', starFlowController.getIncidentReport)
router.post('/incident', starFlowController.addIncidentReport)



// router.get('/weather', weatherController.getWeatherData)
// router.get('/totals', shoppingController.getTotals)
// router.post('/', shoppingController.addItemJar86)
// router.delete('/', shoppingController.removeItemJar86)
// router.post('/checkout', shoppingController.checkout)
// router.get('/inventoryJar86', shoppingController.getInventory)

module.exports = router;