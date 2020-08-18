import React from 'react';
import { loginSuccess } from '../actions/auth';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const reqObj = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }

    console.log(reqObj)

    fetch('http://localhost:3000/auth', reqObj)
      .then(response => response.json())
      .then(student => {
        console.log(student)
        if (student.error){
          alert(student.error)
        } else {
          localStorage.setItem('token', student.jwt)
          this.props.loginSuccess(student)
          this.props.history.push('/student')
        }
        
      })
  }

  render(){
    return (
      <div>
      <Grid centered columns={2}>
      <Grid.Column>
      <Header as="h2" textAlign="center">
        Login
      </Header>
      <Segment>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            name={'username'}
            icon="user"
            iconPosition="left"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInputChange} 
          />
          <Form.Input
            fluid
            name={'password'}
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange} 
          />
 
          <Button color="yellow" fluid size="large" input type='submit' value='Login'>
            Login
          </Button>
        </Form>
      </Segment>
      <Message align='center'>
        Not registered yet? <a href="/signup">Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
  



        <h3>Sign in</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name={'username'} onChange={this.handleInputChange} value={this.state.username} />
          </div>
          <div>
            <input name={'password'} onChange={this.handleInputChange} value={this.state.password} />
          </div>
          <button class='ui primary button'><input type='submit' value='Login' /></button>
        </form> 
        <Link to='/signup'>
          <button class="ui secondary button" type="button">
            Sign Up
          </button>
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)