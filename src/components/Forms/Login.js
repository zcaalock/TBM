import React, { useState, useEffect } from 'react'
import { useDispatch} from "react-redux"
import { connect } from 'react-redux'
import { Button, Form, Message } from 'semantic-ui-react'
import { loginUser } from '../../actions/users'
import { useTranslation } from "react-i18next"
import { editState } from '../../actions/appState'

function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    localStorage.removeItem("state")
    dispatch(editState(false, 'fetchedBoards'))
    dispatch(editState(false, 'fetchedCategories'))
    dispatch(editState(false, 'fetchedClients'))
    dispatch(editState(false, 'fetchedCompetitions'))
    dispatch(editState(false, 'fetchedContacts'))
    dispatch(editState(false, 'fetchedDetails'))
    dispatch(editState(false, 'fetchedNotepad'))
    dispatch(editState(false, 'fetchedPulses'))
    dispatch(editState(false, 'fetchedSettings'))
    dispatch(editState(false, 'fetchedStatus'))
  }, [])

  useEffect(() => {    
    if (props.UI.errors) {
      setErrors(props.UI.errors )  
      setDisable(false)    
    }
  }, [props.UI])

  const dispatch = useDispatch();
const { t } = useTranslation()
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password
    };

    dispatch(loginUser(userData, props.history))
    setDisable(true)

  };
  const handleChange = (event) => {
    
    if (event.target.name === 'email') setEmail(event.target.value)
    if (event.target.name === 'password') setPassword(event.target.value)    
  };

  function handleCredentialError () {
    if (errors.general) return <Message
        error
        header={t('Wrong Credentials')}
        content={t('Wrong email or password please try again')}
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
            disabled={disable}
            id="email"
            name="email"
            type="email"
            label="E-mail"
            //helperText={errors.email}
            //error={errors.email ? true : false}
            error={errors.email ? errors.email : false}
            fluid
            value={email}
            onChange={handleChange}
          />
          <Form.Input
          disabled={disable}
            id="password"
            name="password"
            type="password"
            label={t("Password")}
            //helperText={errors.password}
            error={errors.password ? password : false}
            fluid
            value={password}
            onChange={handleChange}
          />
          {handleCredentialError()}
          <Button
            disabled={disable}
            type="submit"
          >
            {t('Login')}
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