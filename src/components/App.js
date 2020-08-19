import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import '../App.css' 
import Login from './Login'
import Navbar from './Navbar';
import StudentPage from './StudentPage';
import StudentCreateAccount from './StudentCreateAccount';
import AllCoursesPage from './AllCoursesPage';
import CoursePage from './CoursePage';
import HomePage from './HomePage'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <Navbar />
        <div className='main-div'>
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route path='/student' component={StudentPage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={StudentCreateAccount} />
            <Route path='/courses/:courseId' render={(props) => <CoursePage {...props}/>} />
            <Route path='/courses' component={AllCoursesPage} />
            
          </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
