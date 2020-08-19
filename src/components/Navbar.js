import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutUser } from '../actions/auth'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Menu,
  Dropdown,
  Header,
  Message,
  Segment,
  Select, 
  Field
} from 'semantic-ui-react';

class Navbar extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push(`/${name}`)
  }

  logout = (e, { name }) => {
    this.props.logoutUser()
    this.setState({ activeItem: name })
    this.props.history.push(`/${name}`)
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <div>
        <Menu size='large'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='courses'
            active={activeItem === 'courses'}
            onClick={this.handleItemClick}
          />

          { (this.props.auth) ? (
            <Menu.Item
              name='student'
              active={activeItem === 'student'}
              onClick={this.handleItemClick}
            />
          ) : (
            <div></div>
          )

          }

          <Menu.Menu position='right'>
            <Menu.Item 
              name='signup'
              active={activeItem === 'signup'}
              onClick={this.handleItemClick}
            >
              <Button color='black'>Sign Up</Button>
            </Menu.Item>
          {
            this.props.auth ? 
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.logout}
              >
              <Button color='black'>Logout</Button>
            </Menu.Item>
            :
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
              > 
              <Button color='black'>Login</Button>
            </Menu.Item>

          }
          </Menu.Menu>
        </Menu>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));