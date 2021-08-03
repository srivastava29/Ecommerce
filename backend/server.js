//Common JS module use require
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import {notfound,errorhandler} from './middleware/errormiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import morgan from 'morgan'

dotenv.config();
console.log(process.env)
connectDB();

const app=express()

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/',(req,res)=>
{
    res.send("API is running.....");
})


app.use('/api/products',productRoutes) 
app.use('/api/users',userRoutes)   
app.use('/api/order',orderRoutes)  

app.get('/api/config/paypal', (req,res)=>
{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use(notfound)
app.use(errorhandler)


const PORT=process.env.PORT || 5000

app.listen(PORT,console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`))

