const express = require('express')
const { productController } = require('../controllers')

const router = express.Router()

router.get('/getall', productController.getAllProduct)
router.post('/add', productController.addProduct)
router.delete('/delete/:id', productController.deleteProduct)
router.put('/edit/:id', productController.editProduct)

module.exports = router