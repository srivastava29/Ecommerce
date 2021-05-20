import React from 'react'
import {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {PayPalButton} from "react-paypal-button-v2"
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Button, Row, Col, ListGroup,Image,Card, ListGroupItem} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getOrderDetails, payOrder} from '../actions/orderActions'
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import axios from 'axios'

function OrderScreen({match}) {

    
   const orderId=match.params.id;

   const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {order,loading,error} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay,success:successPay} = orderPay

    if(!loading)
    {
    order.itemsPrice= order.orderItems.reduce((acc,item) => acc+item.price * item.qty, 0)
    }
    useEffect(()=>
    {
        const addPayPalScript= async () =>
        {
            const{data:clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async='true'
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay)
        {
            dispatch({ type: ORDER_PAY_RESET})
       dispatch(getOrderDetails(orderId))
        }

        else if(!order.isPaid)
        {
            if(!window.paypal)
            {
                addPayPalScript();
            }
            else
            {
                setSdkReady(true)
            }
        }
        //eslint-disbale-next-line
    },[dispatch,orderId,order])

    const successPaymentHandler = (paymentResult) =>
    {
        dispatch(payOrder(orderId,paymentResult))
    }

    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
    <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                       <p><strong>Name: </strong>{order.user.name}</p> 
                        <p><strong>Email Address: </strong><a href={`mailTo${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postal},{order.shippingAddress.country}
                        </p>
                        <p>{order.isDelievered ? (<Message variant='success'>Delievered On {order.DelieveredAt}</Message>) : 
                        (<Message variant='danger'>Not Delievered</Message>)}</p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                        <p>{order.isPaid ? (<Message variant='success'>Paid On {order.PaidAt}</Message>) : 
                        (<Message variant='danger'>Not Paid</Message>)}</p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length===0 ? <Message>Order is empty</Message> :
                        <ListGroup.Item variant='flush'>
                            {order.orderItems.map((item,index) => (
                                <ListGroup.Item key={index}>
                                <Row>
                                <Col md={1}>
                                    <Image src={item.image} alt={item.brand} fluid rounded></Image>
                                </Col>
                                <Col>
                                <Link to={`product/${item.product}`}>
                                    {item.name}
                                </Link>
                                
                                </Col>
                                <Col md={4}>
                                    {item.qty} x {item.price} = ${item.qty * item.price}
                                </Col>
                                </Row>
                                </ListGroup.Item>
                            ))}
                            </ListGroup.Item>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Items:
                                </Col>
                                <Col>
                                ${order.itemsPrice}
                                </Col>
                            </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping Price:
                                </Col>
                                <Col>
                                ${order.shippingPrice}
                                </Col>
                            </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax Price:
                                </Col>
                                <Col>
                                ${order.taxPrice}
                                </Col>
                            </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <Row>
                                <Col>
                                Total Price:
                                </Col>
                                <Col>
                                ${order.totalPrice}
                                </Col>
                            </Row>
                    </ListGroup.Item>
                    </ListGroup.Item>
                  {!order.isPaid&&(
                      <ListGroup.Item>{!loadingPay}
                      {!sdkReady ? <Loader/> : (
                          <PayPalButton amount ={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                      )}
                      </ListGroup.Item>
                  )}
                </ListGroup>
            </Col>
        </Row>
    </>
}


export default OrderScreen