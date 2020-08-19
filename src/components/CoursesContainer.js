import React from 'react';
import { connect } from 'react-redux'
import { Card, Icon } from 'semantic-ui-react'
import course from '../reducers/courses';
import CourseCard from './CourseCard';
import { currentUser } from '../actions/auth';


const extra = (
  <a>
    <Icon name='calendar alternate outline' />
    {course.meeting_day}
  </a>
)

class CoursesContainer extends React.Component {
  
  componentDidMount() {
    const token = localStorage.getItem('token')

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

    // fetch('http://localhost:3000/courses')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     this.props.coursesDataSuccess(data)
    //   })
    //   console.log(this.props)
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

// const mapStateToProps = (state) => {
//   return {
//     courses: state.courses
//   }
// }

const mapDispatchToProps = {
  currentUser
}

export default connect(null, mapDispatchToProps)(CoursesContainer);