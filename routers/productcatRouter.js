const express = require('express')
const { productcatController } = require('../controllers')

const router = express.Router()

router.get('/getall', productcatController.getAllProductCat)
router.post('/add', productcatController.addProductCat)
router.delete('/delete/:id', productcatController.deleteProductCat)
router.put('/edit/:id', productcatController.editProductCat)

module.exports = router