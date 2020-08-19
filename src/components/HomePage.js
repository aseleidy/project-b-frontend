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
  Image
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
      </Header>
      <Segment>
        
        <Image src='../images/project-b-logo' size='medium' floated='center' />
       
      </Segment>
      <Message align='center' color='black'>
      <p>Project B is a school for youth and young adults in the Middle East. The idea is to cultivate a new generation of citizens who appreciate diversity, promote a culture of peace, lead responsibly, and embrace lifelong learning. Unlike in traditional schools, students will receive instruction in subjects that aren’t typically covered, including emotional intelligence, cognitive processes, and philosophy. They will be challenged to think critically about both their external environments and their individual qualities. This critical reasoning combined with the nuanced curriculum and school’s resources will equip students with the tools needed to overcome obstacles and flourish as changemakers.</p>
      <p>The project was inspired by an entrepreneurship workshop at Karam House, an innovative workspace for Syrian students in Istanbul, wherein "instruction" emphasized purposeful reflection instead of rote memorization. The takeaways from that workshop, combined with our strong belief in the power of education to improve lives, led us to launch this distinct educational program that shuns boundaries and rigid pedagogy.</p>
      <p>"B" stands for bravery, beginning, belonging, believing and most importantly, being.</p>
      </Message>
    </Grid.Column>
  </Grid>
  



       
      </div>
    )
  }
}

const mapDispatchToProps = {
  loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)