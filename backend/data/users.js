import bcrypt from 'bcryptjs'

const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:'true'
    },
    {
        name:'Mudita Sri',
        email:'mudita@example.com',
        password:bcrypt.hashSync('123456',10),
        
    },
    {
        name:'Prakh Sri',
        email:'prakh@example.com',
        password:bcrypt.hashSync('123456',10),
     
    }
]

export default users;