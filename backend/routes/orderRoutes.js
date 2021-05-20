import express from 'express'
import {addOrderItems, getOrderById, updateOrderToPaid,getMyOrders} from '../controllers/orderController.js'
import protect from '../middleware/authmiddleware.js'

const router =  express.Router();

router.route('/').post(protect,addOrderItems)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id').get(protect,getOrderById)


export default router;