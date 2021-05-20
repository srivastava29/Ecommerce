import asyncHandler from 'express-async-handler'
import User from '../models/UserModel.js'
import generateToken from '../utils/generateToken.js'

//@route : POST /api/users/login


const authUser = asyncHandler(async(req,res)=>
{
    const {email,password} = req.body

    const user = await User.findOne({email:email}) //find user with the entered email

    if(user && (await user.matchPassword(password)))
    {
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    }

    else
    {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


const registerUser = asyncHandler(async(req,res)=>
{
    const {name,email,password} = req.body

    const userExists = await User.findOne({email:email}) //find user with the entered email
    console.log(userExists)
    if(userExists)
    {
        res.status(400)
        throw new Error('User already Exists')
    }
    
        const user = await User.create({
            name,
            email,
            password
        })

        if(user)
        {
            res.status(201)
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                token:generateToken(user._id)
            })

        }
        else
        {
            res.status(400)
            throw new Error('Invalid User Data')
        }
})


const getUserProfile = asyncHandler(async(req,res)=>
{

   const user = await User.findById(req.user._id)

   console.log("USer"+user)

   if(user)
   {
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin: user.isAdmin,
    })
   }
   else{
       res.status(404)
       throw new Error('No User found')
   }
})

//update user

const updateUserProfile = asyncHandler(async(req,res)=>
{

   const user = await User.findById(req.user._id)

   if(user)
   {
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
        if(req.user.password)
        {
            user.password =  req.user.password
        }

        const UpdatedUser =  await user.save()

        res.json({
            _id:UpdatedUser._id,
            name:UpdatedUser.name,
            email:UpdatedUser.email,
            isAdmin: UpdatedUser.isAdmin,
            token:generateToken(UpdatedUser._id)
        })
   }
   else{
       res.status(404)
       throw new Error('No User found')
   }
})

export 
{
    authUser, 
    getUserProfile,
    registerUser,
    updateUserProfile

}