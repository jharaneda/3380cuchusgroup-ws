var express = require('express')
var router = express.Router()

var starFlowController = require('../controllers/starflowControllerJar86.js')

router.get('/tenants', starFlowController.getTenantListJar86)
router.get('/incident', starFlowController.getIncidentReport)
router.get('/todolist', starFlowController.getTodoList)
router.get('/health', starFlowController.getHealtWellness)
router.post('/incident', starFlowController.addIncidentReport)
router.post('/todolist', starFlowController.addTodo)
router.post('/health', starFlowController.addHealth)
// router.get('/totals', shoppingController.getTotals)
// router.post('/', shoppingController.addItemJar86)
// router.delete('/', shoppingController.removeItemJar86)
// router.post('/checkout', shoppingController.checkout)
// router.get('/inventoryJar86', shoppingController.getInventory)

module.exports = router;