import asyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js'

const getProducts = asyncHandler(async(req,res)=>
{
    const product=await Product.find({})
    res.json(product)
})

const getProductById = asyncHandler(async(req,res)=>
{
    const product= await Product.findById(req.params.id)

    if(product){
    res.json(product)
    }
    else
    {
        res.status(404)
        throw new Error('Product not found')
    }
})


const createProductReview = asyncHandler(async(req,res)=>
{
    const {rating,comment} = req.body

    const product= await Product.findById(req.params.id)

    if(product){
    const alreadyReviewed = product.reviews.find(r=> r.user.toString() === req.user._id.toString())

    if(alreadyReviewed)
    {
        res.status('400')
        throw new Error("Product Already Reviewed")
    }
    const review ={
        name:req.user.name,
        rating:Number(rating),
        comment,
        user:req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    
    product.rating= product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length

    await product.save()
    res.status(201).json({message:'Review added'})
    }
    else
    {
        res.status(404)
        throw new Error('Product not found')
    }
})




export {getProducts,
    getProductById,
    createProductReview

}