import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { signUp, signIn } from "../redux/actions/authActions"
import NavigationUp from '../Components/NavigationUp'
import { GoogleLogin } from "react-google-login"
import{FcGoogle} from "react-icons/fc"
import {useNavigate} from "react-router-dom"


function AuthPage() {
  const initialFormData = {
    userName:"",
    email: "",
    password: "",
    confirmPassword: ""
  }
 

  const [formData, setFormData] = useState(initialFormData)
  const [login, setLogin] = useState(true)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const googleLogin = "googleLogin"

  const googleSuccess=(res)=>{
    const user = res?.profileObj
    const accessToken = res?.tokenId
    try {
      dispatch({type:'AUTH', payload:{user,accessToken,googleLogin}})
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const googleFail=(err)=>{
    console.log(err)
  }

  return (
    <><div id='auth-page'>
      <NavigationUp></NavigationUp>
      
      <Container id='auth-page-container'>
        <Row>
          <Col >
            {
              login ?
                (
                  <Form id='form' className='align-content-center mt-5'
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (login) {
                        dispatch(signIn(formData))
                        navigate("/")
                      }

                    }}
                  >
                    <h1 className='text-center mt-3'>Sign In</h1>
                    <Form.Group className='mt-3'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control onChange={(e) => setFormData({ ...formData, email: e.target.value })} type='email' placeholder='E-mail'></Form.Control>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control onChange={(e) => setFormData({ ...formData, password: e.target.value })} type='password' placeholder='Password'></Form.Control>
                    </Form.Group>
                    <Button className='w-100 mt-3' type='submit' >LogIn</Button>
                    <GoogleLogin
                      clientId='891490391789-0nt993e5vjj8jkshdkmt6vjqukpgb8ff.apps.googleusercontent.com'
                    onSuccess={googleSuccess}
                    onFailure={googleFail}
                    render={renderProps => (
                      <Button className='w-100 mt-2' onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle size={22} className="text-center"></FcGoogle> Login with Google</Button>
                    )}
                    />
                    <Form.Text>Don't have an account? <span onClick={(e) => setLogin(!login)} style={{ fontWeight: "bold", cursor: "pointer" }}>Sign Up</span> </Form.Text>
                  </Form>
                )
                : (<Form id="form" className='align-content-center mt-5'
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!login) {
                      dispatch(signUp(formData))
                      navigate("/")
                    }
                  }}>
                  <h1 className='text-center mt-3'>Sign Up</h1>
                  <Form.Group className='mt-3'>
                  <Form.Label>User Name</Form.Label>
                    <Form.Control onChange={(e) => setFormData({ ...formData, userName: e.target.value })} type='text' placeholder='User Name'></Form.Control>
                  </Form.Group>
                  <Form.Group className='mt-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => setFormData({ ...formData, email: e.target.value })} type='email' placeholder='E-mail'></Form.Control>
                  </Form.Group>
                  <Form.Group className='mt-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setFormData({ ...formData, password: e.target.value })} type='password' placeholder='Password'></Form.Control>
                  </Form.Group>
                  <Form.Group className='mt-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} type='password' placeholder='Password'></Form.Control>
                  </Form.Group>
                  <Button className='w-100 mt-3' type='submit'>SignUp</Button>
                  <Form.Text>Do you have already an account? <span onClick={(e) => setLogin(!login)} style={{ fontWeight: "bold", cursor: "pointer" }}>Sign In</span> </Form.Text>
                </Form>)
            }
          </Col>
        </Row>
      </Container>
      </div>
    </>
  )
}

export default AuthPage


