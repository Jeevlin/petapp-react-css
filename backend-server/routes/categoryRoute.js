const express = require('express')

const router = express.Router()
const categoryC = require('../controllers/categoryC')

router.post('/addCategory',categoryC.addCategory)
router.get('/getCategory',categoryC.getCategory)
router.delete('/deleteCategory/:id', categoryC.deleteCategory)  

module.exports=router
