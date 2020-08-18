import React from 'react';
import { connect } from 'react-redux'
import { Card, Icon } from 'semantic-ui-react'
import { coursesDataSuccess } from '../actions/courses';
import course from '../reducers/courses';
import CourseCard from './CourseCard';

const src = '/images/wireframe/image.png'

const extra = (
  <a>
    <Icon name='calendar alternate outline' />
    {course.meeting_day}
  </a>
)


class CoursesContainer extends React.Component {
  
  componentDidMount() {
    fetch('http://localhost:3000/courses')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.props.coursesDataSuccess(data)
      })
      console.log(this.props)
  }

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
    return (
      <div>
        <div className='page-header'>
          <h1>Active Courses</h1>
        </div>
        <Card.Group itemsPerRow={4}>
          {
            this.props.courses.map((course) => {
              return (<CourseCard course={course} />)
            })
          }
        </Card.Group>
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

export default connect(mapStateToProps, mapDispathToProps)(CoursesContainer);
