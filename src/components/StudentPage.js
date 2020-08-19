import React from 'react';
import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'
import Navbar from './Navbar';
import CoursesContainer from './CoursesContainer';
import {
  Divider
} from 'semantic-ui-react';

class StudentPage extends React.Component {

  componentDidMount(){
    const token = localStorage.getItem('token')
    if (!token) {
      this.props.history.push('/login')
    } else {

      const reqObj = {
        method: 'GET', 
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      fetch('http://localhost:3000/current_user', reqObj)
        .then(response => response.json())
        .then(student => {
          if (student.error) {
            this.props.history.push('/login')
          } else {
            this.props.currentUser(student)
          }
        })
      }

  }

  render(){
    // const { first_name, courses} = this.props.auth
    console.log(this.props.auth)
    return (
      <div>
        <h1>Welcome, {this.props.auth && this.props.auth.first_name}!</h1>
        <Divider />
        <div className='courses-container'>
          <h3>Active Courses</h3>
        <div>
          { 
          this.props.auth ? 
            <CoursesContainer courses={this.props.auth.courses} />
          :
            <div><p>Loading...</p></div>
          }
        </div>
        </div>
        
        <div className='courses-container'> 
          <h3>Recommmended Courses</h3>
        <div>
        { 
          this.props.auth ? 
            <CoursesContainer courses={this.props.auth.courses} />
          :
            <div><p>Loading...</p></div>
          }

        </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispathToProps = {
  currentUser
}

export default connect(mapStateToProps, mapDispathToProps)(StudentPage);
