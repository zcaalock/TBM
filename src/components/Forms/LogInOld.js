import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { connect } from 'react-redux'
import {fetchUsers} from '../../actions/users'
import { Button, Form, Message } from 'semantic-ui-react'

class Login extends React.Component {
  state={text: ""}
  componentDidMount(){
    this.props.fetchUsers()
    
  }

  onSubmit(users){
    axios
      .post('/login', {email: "user@email.com", password: "123456"})
      .then(res => {
        console.log(res.data.token)
      })
    const initials =_.filter(users, {userInitials: this.state.text})    
    if (initials.length>0) {
      console.log('pass', this.state)
      return this.props.goLing()
    } else {
      this.setState({error: true})
      console.log('wrong', this.state.error)
    }
    
  }

  handleMessage(){    
    if (this.state.error===true)  {
      console.log('sdfsdf')
      return <Message error header='Wrong Name' content="Please enter valid Initials" />
    }
  }

  render(){
    //console.log('users:', this.props.users)
    return (
    <Form error onSubmit={()=>this.onSubmit(this.props.users)} >
    <Form.Input onChange={(e)=>this.setState({text: e.target.value, error:false})}  label='Enter initials' placeholder='Your initials' />
    {this.handleMessage()}
    <Button>Submit</Button>
  </Form>
    )
  }
}
  
const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users)

  }
}

export default connect(mapStateToProps,{fetchUsers}) (Login)