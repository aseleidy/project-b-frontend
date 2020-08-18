import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <div className="ui large menu">
          <a className="active item">
            Home
          </a>
          <a className="item">
            <Link to='/courses'>
              Courses
            </Link>
          </a>
          <div className="right menu">
            <div className="item">
                <div className="ui primary button">Sign Up</div>
            </div>
            <div class="item">
              {
                this.props.auth ? 
                  <div className="ui primary button" onClick={this.props.logoutUser}>Logout</div>
                : 
                  <div className="ui primary button" >Login</div> 
              }
                
            </div>
          </div>
        </div>

        <div>
          <Link to='/student'>

          </Link>
        </div>

        <div>
          {
            this.props.auth ? 
              <Link to='/login' onClick={this.props.logoutUser}>
                Logout
              </Link>
            :
              <Link to='/login' >
                Login
              </Link>
          }
        
          <Link to='/courses'>
            Courses
          </Link>
          
          <Link to='/student'>
            My Profile
          </Link>
        </div>
        
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)