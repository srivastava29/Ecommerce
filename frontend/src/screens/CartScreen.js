import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { addToCart,removeFromCart } from "../actions/cartActions";
import '../index.css'; 

//@location: used for query string

function CartScreen({match,location,history}) {
    
    const productId = match.params.id

    const qty = location.search? Number(location.search.split('?')[1]) : 1

    

    const dispatch = useDispatch()

    const cart = useSelector(state=> state.cart)
    const {cartItems}= cart

    const checkoutHandler = ()=>
    {
        cartItems ? history.push('/ship') : console.log("No qty")
    }

    useEffect(()=>
    {
        if(productId)
        {
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty]
    )

const removefromCartHandler=(id)=>
{
    dispatch(removeFromCart(id))
}

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your Cart Is Empty <Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant="flush">
                        {cartItems.map(item=>(
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                    <Form.Control as='select' value={item.qty}  onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                   { [...Array(item.countInStock).keys()].map((x)=> (
                                    <option key={x+1} value={x+1}>
                                        {x+1}
                                        </option>))}
                                </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                   
                                        <Button type='button' variant='dark' onClick={()=>removefromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                            )}
                    </ListGroup>
                )}
            </Col>
            <Row>
            <Col md={0}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        
                        SubTotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) Items
                        
                        $ {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                       
                        
            <Button type="button" className='btn-block' onClick={checkoutHandler}>PROCEED TO CHECKOUT</Button>
            
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
            
            

        </Row>
    )
}


export default CartScreen