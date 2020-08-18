import React from 'react';
import { connect } from 'react-redux'
import { courseDataSuccess } from '../actions/courses';
import course from '../reducers/courses';
import { withRouter } from 'react-router-dom'


class CoursePage extends React.Component {
  
  // componentDidMount() {
  //   fetch('http://localhost:3000/courses/{course_id}')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       this.props.courseDataSuccess(data)
  //     })
  //     console.log(this.props)
  // }

  convertTime = (courseTime) => {
    const time = courseTime.split('T')[1].slice(0, 5)
    return time 
  }

  convertTimePeriod = (courseTime) => {
    const time = courseTime.split('T')[1]
    if ((parseInt(time[0]) > 1) && (parseInt(time[1]) >= 2)) {
      return 'PM'
    } else {
      return 'AM'
    }
    
  }

  render(){
    console.log(this.props)
    const courseId = this.props.match.params.courseId
    const course = this.props.courses.filter((course) => course.id === parseInt(courseId))[0]
    console.log(course)
    
    return (
      <div>
        <h1>
          {course && course.title}
        </h1>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  }
}

export default withRouter(connect(mapStateToProps, null)(CoursePage));
