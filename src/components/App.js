import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import '../App.css' 
import Login from './Login'
import Navbar from './Navbar';
import Student from './Student';
import StudentCreateAccount from './StudentCreateAccount';
import CoursesContainer from './CoursesContainer';
import CoursePage from './CoursePage';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <Navbar />
        <div className='main-div'>
          <Switch>
            <Route path='/student' component={Student} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={StudentCreateAccount} />
            <Route path='/courses/:courseId' render={(props) => <CoursePage {...props}/>} />
            <Route path='/courses' component={CoursesContainer} />
            
          </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
