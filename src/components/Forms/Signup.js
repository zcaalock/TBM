import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Message } from 'semantic-ui-react'
import { signupUser } from '../../actions/users'

class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };

    this.props.signupUser(userData, this.props.history);

  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCredentialError() {
    if (this.state.errors.general)
      return <Message
        error
        header='Wrong Credentials'
        content='Wrong email or password please try again'
      />
  }


  render() {
    //console.log('login state: ', this.state)
    const { errors } = this.state;

    return (
      <div>
        <div style={{ width: '100%', textAlign: 'center', position: "fixed", height: '', padding: '20px', display: 'inline-block' }} className="leftMenu header">
          <div className='item leftMenu-main'><h3>Task Manager</h3></div>
        </div>
        <div className='login' style={{top: 'calc(50% - 200px)'}}>
          <Form error onSubmit={this.handleSubmit} >
            <Form.Input
              id="email"
              name="email"
              type="email"
              label="Email"
              //helperText={errors.email}
              //error={errors.email ? true : false}
              error={errors.email ? errors.email : false}
              fluid
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Form.Input
              id="password"
              name="password"
              type="password"
              label="Password"
              //helperText={errors.password}
              error={errors.password ? errors.password : false}
              fluid
              value={this.state.password}
              onChange={this.handleChange}
            />
            <Form.Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              //helperText={errors.password}
              error={errors.confirmPassword ? errors.confirmPassword : false}
              fluid
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <Form.Input
              id="handle"
              name="handle"
              type="text"
              label="Your name"
              //helperText={errors.password}
              error={errors.handle ? errors.handle : false}
              fluid
              value={this.state.handle}
              onChange={this.handleChange}
            />
            {this.handleCredentialError()}
            <Button type="submit">Signup</Button>
          </Form>
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI
  }
}

export default connect(mapStateToProps, { signupUser })(Signup)