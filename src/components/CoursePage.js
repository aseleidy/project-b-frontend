import React from 'react';
import { connect } from 'react-redux'
import { courseDataSuccess } from '../actions/courses';
import course from '../reducers/courses';
import { currentUser } from '../actions/auth';
import { withRouter, Link } from 'react-router-dom'
import { Button, Icon, Grid, Image, Card } from 'semantic-ui-react';

const proficiencyLevels = [
  'No proficiency (0)',
  'Elementary proficiency (1)',
  'Limited working proficiency (2)',
  'Professional working proficiency (3)',
  'Full professional proficiency (4)',
  'Native/bilingual proficiency (5)'
]

class CoursePage extends React.Component {

  constructor() {
    super()
    this.state = {
      isRegistered: false
    }
  }
  
  componentDidMount() {
    const token = localStorage.getItem('token')
    const courseId = this.props.match.params.courseId
    const studentCourses = this.props.auth.courses.map((course) => (course.id))

    
    if (!token || studentCourses.includes(parseInt(courseId))) {
      this.setState({
        isRegistered: true
      })
    }
   
  //   fetch('http://localhost:3000/courses/{course_id}')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       this.props.courseDataSuccess(data)
  //     })
  //     console.log(this.props)
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

  handleClick = (courseId, studentId) => {
    const obj = {
      course_id: courseId,
      student_id: studentId
    }

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }

    fetch('http://localhost:3000/course_users', reqObj)

    fetch(`http://localhost:3000/students/${studentId}`)
      .then(response => response.json())
      .then(student => {
        this.props.currentUser(student)

        this.setState({
          isRegistered: true
        })
      })

  }
  
  render(){
    console.log(this.props)
    const courseId = this.props.match.params.courseId
    const studentId = this.props.auth.id
    const studentCourses = this.props.auth.courses.map((course) => (course.id))
    const course = this.props.courses.filter((course) => course.id === parseInt(courseId))[0]
    const token = localStorage.getItem('token')
    const spotsLeft = 5 - course.students.length

    console.log(studentCourses.includes(parseInt(courseId)))
    
    
    return (
      
      <div>
        <Grid divided='vertically'>
        <div>
        <Grid.Row columns={1}>
          <Grid.Column>
          
        <Image src={course.img_url} size='medium' floated='left' />
        <h1>
          {course && course.title}
        </h1>
         
        { (this.state.isRegistered === true) ? (
          <div>
          <Button disabled>
            <Icon name='plus' />
              Register
          </Button>
         
          <a>
            {/* <Link to="/signup">Sign Up to Register</Link> */}
          </a>
          
          </div>
        ) : (
          
          <Button color='yellow' value='Register' 
            onClick={() => this.handleClick(courseId, studentId)}>
          <Icon name='plus' />
            Register
          </Button>
          
        )}
        <h3>Overview</h3>
        <p>{course && course.summary}</p>
        
        </Grid.Column>
        </Grid.Row>
        </div>
     
       
          <Grid.Row columns={2}>
            <Grid.Column>
              <h3>Detailed Description</h3>
              <p>{course && course.description}</p>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content header='Course Details' />
                <Card.Content >
                  <div>
                    Start Date: {course.start_date} 
                  </div> 
                  <div>
                    Session Days: {course.meeting_day}
                  </div>
                  <div>
                    Session Time: {course.time}
                  </div>
                  <div>
                    Session Time: {course.time}
                  </div>
                </Card.Content>
                <Card.Content header='Minimum Proficiency Levels' />
                <Card.Content >
                  <div>
                    <h4>
                      English
                    </h4>
                  </div>
                  <div>
                    Reading: {proficiencyLevels[course.english_reading]} 
                  </div> 
                  <div>
                    Writing: {proficiencyLevels[course.english_writing]} 
                  </div> 
                  <div>
                    Listening: {proficiencyLevels[course.english_listening]} 
                  </div> 
                  <div>
                    Speaking: {proficiencyLevels[course.english_speaking]} 
                  </div> 

                  <div>
                    <h4>
                      Arabic
                    </h4>
                  </div>
                  <div>
                    Reading: {proficiencyLevels[course.arabic_reading]} 
                  </div> 
                  <div>
                    Writing: {proficiencyLevels[course.arabic_writing]} 
                  </div> 
                  <div>
                    Listening: {proficiencyLevels[course.arabic_listening]} 
                  </div> 
                  <div>
                    Speaking: {proficiencyLevels[course.arabic_speaking]} 
                  </div> 

                  <div>
                    <h4>
                      Turkish
                    </h4>
                  </div>
                  <div>
                    Reading: {proficiencyLevels[course.turkish_reading]} 
                  </div> 
                  <div>
                    Writing: {proficiencyLevels[course.turkish_writing]} 
                  </div> 
                  <div>
                    Listening: {proficiencyLevels[course.turkish_listening]} 
                  </div> 
                  <div>
                    Speaking: {proficiencyLevels[course.turkish_speaking]} 
                  </div> 

                </Card.Content>
                <Card.Content extra>
                  <Icon name='user' />{spotsLeft} Spots Remaining
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
     

      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    courses: state.courses
  }
}

const mapDispatchToProps = {
  currentUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursePage));
