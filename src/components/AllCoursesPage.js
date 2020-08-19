import React from 'react';
import { connect } from 'react-redux'
import CoursesContainer from './CoursesContainer';
import { coursesDataSuccess } from '../actions/courses';


class AllCoursesPage extends React.Component {

  componentDidMount() {
    fetch('http://localhost:3000/courses')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.props.coursesDataSuccess(data)
      })
  }
  
  render(){
    return (
      <div>
        <div className='page-header'>
          <h1>Active Courses</h1>
        </div>
        <CoursesContainer courses={this.props.courses}/>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  }
}

const mapDispathToProps = {
  coursesDataSuccess
}

export default connect(mapStateToProps, mapDispathToProps)(AllCoursesPage);
