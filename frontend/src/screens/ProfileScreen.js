import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Row, Form, Button,Col, Table} from 'react-bootstrap'
import {details,updateUserProfile} from '../actions/userActions' 
import {listMyOrders} from '../actions/orderActions'


 function ProfileScreen({location,history}) {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)


    const dispatch = useDispatch()

        const userdetails = useSelector(state => state.userDetails)
        const {loading,error,user} = userdetails
        console.log(userdetails)
        const userLogin = useSelector(state => state.userLogin)
        const {userInfo} = userLogin

        const userUpdate = useSelector(state => state.userUpdateProfile)
        const {success} = userUpdate

        const orderListMy = useSelector(state => state.orderListMy)
        const {loading:loadingOrders,error:errorOrders,orders} = orderListMy

        console.log("Orders Reducer"+orders)

    useEffect(()=>
    {
        if(!userInfo)
        {
            history.push('/login')
        }
        else{
            if(!user.name)
            {   
                dispatch(details('profile'))
                dispatch(listMyOrders())
                
            }
            else
            {
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history,userInfo,dispatch,user])

    const submitHandler = (e)=>
    {
        e.preventDefault();
        //DISPATCH REGISTER
            if(password!=confirmpassword)
            {
                setMessage('Passwords do not match')
            }
            else
            {
                dispatch(updateUserProfile({id:user._id,name,email,password}))
            }
    }

    return (
                <Row>
                    <Col md={3}>
                    <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="Enter confirm password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">Update</Button>
                </Form>
                    </Col>
                    <Col md={9}>
                   <h2>My Orders</h2>
                   {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
                   (<Table striped bordered hover responsive className='tabke-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIEVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => {
                                <tr key={order._id}>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order._totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className='fas-fa-times' style={{color:'red'}}></i>)}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (<i className='fas-fa-times' style={{color:'red'}}></i>)}</td>
                                    <td><LinkContainer to={`/order/${order._id}`}>
                                        <Button variant="dark">Details</Button>

                                        </LinkContainer></td>
                
                                </tr>
                            })}
                        </tbody>
                   </Table>)
                   }
                   </Col>
                </Row>
       
    )
}

export default ProfileScreen