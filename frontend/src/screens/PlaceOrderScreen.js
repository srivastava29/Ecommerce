import React from 'react'
import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Button, Row, Col, ListGroup,Image,Card} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import {Link} from 'react-router-dom'
import {createOrder} from '../actions/orderActions'

function PlaceOrderScreen({history}) {
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()
    //Calculate Price

    cart.itemsPrice= cart.cartItems.reduce((acc,item) => acc+item.price * item.qty, 0)
    cart.shippingPrice= cart.itemsPrice > 100 ? 0.00 : 100.00
    cart.taxPrice=Number((0.15 * cart.itemsPrice).toFixed(2))
    cart.totalPrice= Number((cart.itemsPrice+cart.shippingPrice+cart.taxPrice).toFixed(2))

    const orderCreate = useSelector(state => state.orderCreate)
    const {order,success,error} = orderCreate

    useEffect(()=>
    {
        if(success)
        {
            history.push(`/order/${order._id}`)
        }
        //eslint-disbale-next-line
    },[history,success])

    const placeOrderHandler =()=>
    {
        console.log("Place Order")
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            price: cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
    }
    
    return (
        <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postal},{cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length===0 ? <Message>Your cart is empty</Message> :
                        <ListGroup.Item variant='flush'>
                            {cart.cartItems.map((item,index) => (
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
                                ${cart.itemsPrice}
                                </Col>
                            </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping Price:
                                </Col>
                                <Col>
                                ${cart.shippingPrice}
                                </Col>
                            </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax Price:
                                </Col>
                                <Col>
                                ${cart.taxPrice}
                                </Col>
                            </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <Row>
                                <Col>
                                Total Price:
                                </Col>
                                <Col>
                                ${cart.totalPrice}
                                </Col>
                            </Row>
                    </ListGroup.Item>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type="button" className='btn-block' disabled={cart.cartItems===0} onClick={placeOrderHandler}>Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
    )
}


export default PlaceOrderScreen