import jwt from 'JsonWebToken';
import asyncHandler from 'express-async-handler'
import User from  '../models/UserModel.js'

const protect = asyncHandler(async (req,res,next) =>
{
    let token
    console.log(req.headers.authorization + " "+req.headers.authorization.startsWith('Bearer'))
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await User.findById(decoded.id).select('-password') //get all details except password
            console.log("User"+req.user)
        next()
        }
        catch(e)
        {
            console.error(e)
            res.status(401)
            throw new Error("Not autorized, token failed")
        }
    }

    if(!token)
    {
        res.status(401)
        throw new Error('Not autorized, no token')
    }

})


export default protect