import asyncHandler from 'express-async-handler'
import Order from '../models/OrderModel.js'


const addOrderItems = asyncHandler(async(req,res)=>
{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    console.log("Order"+req.body)
    if(orderItems && orderItems.length===0)
    {
        console.log("Order1"+req.body)
        res.status(400)
        
        throw new Error('No Order Items')
    }

    else{
        console.log("Order2"+req.body)
        const order = new Order(
            {
                orderItems, 
                shippingAddress, 
                user: req.user._id,
                paymentMethod, 
                itemsPrice, 
                taxPrice, 
                shippingPrice, 
                totalPrice
                
            }
        )
        console.log(order)
        const createdOrder = await order.save()
        console.log(createdOrder)
        res.status(201).json(createdOrder)
    }
})

const getOrderById = asyncHandler(async(req,res)=>
{
   const order = await Order.findById(req.params.id).populate('user','name email')



    if(order)
    {
        res.json(order)
        
    }

    else{
        res.status(404)
        throw new Error('Order Not Found')
    }
})


const updateOrderToPaid = asyncHandler(async(req,res)=>
{
   const order = await Order.findById(req.params.id)



    if(order)
    {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult =
        {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address,

        }
        const updatedOrder= await order.save()
        res.json(updatedOrder)
    }

    else{
        res.status(404)
        throw new Error('Order Not Found')
    }
})

const getMyOrders = asyncHandler(async(req,res)=>
{
   const orders = await Order.find({user:req.user._id})
   console.log(orders)
    res.json(orders)
})


export {addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
}