import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { connect } from 'react-redux'
import { Button, Form, Message } from 'semantic-ui-react'
import { loginUser } from '../../actions/users'

function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    localStorage.removeItem("state")
  }, [])

  useEffect(() => {    
    if (props.UI.errors) {
      setErrors(props.UI.errors )
      
    }
  }, [props.UI])

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password
    };

    dispatch(loginUser(userData, props.history))

  };
  const handleChange = (event) => {
    
    if (event.target.name === 'email') setEmail(event.target.value)
    if (event.target.name === 'password') setPassword(event.target.value)    
  };

  function handleCredentialError () {
    if (errors.general) return <Message
        error
        header='Wrong Credentials'
        content='Wrong email or password please try again'
      />
  } 
  return (
    <div>
      <div style={{ width: '100%', textAlign: 'center', position: "fixed", height: '', padding: '20px', display: 'inline-block' }} className="leftMenu header">
        <div className='item leftMenu-main'><h3>Task Manager</h3></div>
      </div>
      <div className='login'>
        <Form error onSubmit={handleSubmit} >
          <Form.Input
            id="email"
            name="email"
            type="email"
            label="Email"
            //helperText={errors.email}
            //error={errors.email ? true : false}
            error={errors.email ? errors.email : false}
            fluid
            value={email}
            onChange={handleChange}
          />
          <Form.Input
            id="password"
            name="password"
            type="password"
            label="Password"
            //helperText={errors.password}
            error={errors.password ? password : false}
            fluid
            value={password}
            onChange={handleChange}
          />
          {handleCredentialError()}
          <Button
            type="submit"
          >
            Login
        </Button>
        </Form>
      </div>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI
  }
}

export default connect(mapStateToProps, { loginUser })(Login)