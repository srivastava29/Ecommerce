import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {login} from '../actions/userActions' 

 function LoginScreen({location,history}) {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

        const userLogin = useSelector(state => state.userLogin)

        const {loading,error,userInfo} = userLogin

    useEffect(()=>
    {
        if(userInfo)
        {
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e)=>
    {
        e.preventDefault();
        //DISPATCH LOGIN

        dispatch(login(email,password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
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

                <Button type="submit" variant="primary">Sign In</Button>
                </Form>

                <Row className="py-3">
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>register</Link>
                </Row>
        </FormContainer>
    )
}

export default LoginScreen