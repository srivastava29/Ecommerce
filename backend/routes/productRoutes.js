import express from 'express'
import {getProductById,getProducts} from '../controllers/productController.js'

const router =  express.Router();



//fetch all products @access public
router.get('/', getProducts)

//fetch single products @access public
router.get('/:id',getProductById)


export default router;