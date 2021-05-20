import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {register} from '../actions/userActions' 

 function RegisterScreen({location,history}) {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

        const userRegister = useSelector(state => state.userRegister)

        const {loading,error,userInfo} = userRegister

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
        //DISPATCH REGISTER
            if(password!=confirmpassword)
            {
                setMessage('Passwords do not match')
            }
            else
            {
                dispatch(register(name,email,password))
            }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
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

                <Button type="submit" variant="primary">Register</Button>
                </Form>

                <Row className="py-3">
                   Have an Account? <Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>Login</Link>
                </Row>
        </FormContainer>
    )
}

export default RegisterScreen