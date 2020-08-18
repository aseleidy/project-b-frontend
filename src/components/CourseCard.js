import React from 'react';
import { connect } from 'react-redux'
import { Card, Icon } from 'semantic-ui-react'
import CoursePage from './CoursePage';
import { withRouter } from 'react-router-dom'
// import { coursesDataSuccess } from '../actions/courses';
// import course from '../reducers/courses';


class CourseCard extends React.Component {
  
  
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

  handleClick = (course) => {
    console.log(course)
    this.props.history.push(`/courses/${course.id}`)
  
  }

  render(props){
    const { course } = this.props

    return (
      <Card
        image={course.img_url}
        header={course.title}
        meta=''
        description={course.summary}
        extra={
          <a>
            <Icon name='calendar alternate outline' />
            {course.meeting_day}, {this.convertTime(course.time)}{this.convertTimePeriod(course.time)}
          </a>
        } 
        id={course.id}
        raised
        onClick={() => {this.handleClick(course)}}
      />
    )
  }
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  }
}

// const mapDispathToProps = {
//   courseDataSuccess
// }

export default withRouter(connect(mapStateToProps, null)(CourseCard));
