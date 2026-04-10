const express = require('express')
const router = express.Router()

const controller = require('../controllers/confessionController')

router.post('/confessions', controller.createConfession)
router.get('/confessions', controller.getAllConfessions)
router.get('/confessions/:id', controller.getOneConfession)
router.get('/confessions/category/:cat', controller.getByCategory)
router.delete('/confessions/:id', controller.deleteConfession)

module.exports = router