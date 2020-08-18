export const coursesDataSuccess = (courses) => {
  return {
    type: 'COURSES_DATA_SUCCESS',
    courses
  }
}

export const courseDataSuccess = (course) => {
  return {
    type: 'COURSE_DATA_SUCCESS',
    course
  }
}