const express = require('express')
const { categoryController } = require('../controllers')

const router = express.Router()

router.get('/getall', categoryController.getAllCategory)
router.get('/getallleaf', categoryController.getAllLeafCategory)
router.post('/add', categoryController.addCategory)
router.delete('/delete/:id', categoryController.deleteCategory)
router.put('/edit/:id', categoryController.editCategory)

module.exports = router