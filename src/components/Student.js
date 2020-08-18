import React from 'react';
import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'
import Navbar from './Navbar';

class Student extends React.Component {

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
    return (
      <div>
        <h1>Welcome, Ashley!</h1>
        <h3>Active Courses</h3>
        <h3>Recommmended Courses</h3>
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

export default connect(mapStateToProps, mapDispathToProps)(Student);
