export default function courses(state=[], action) {
  switch(action.type) {
    case 'COURSES_DATA_SUCCESS':
      return action.courses
    case 'COURSES_DATA_SUCCESS':
      return action.course
    default: 
      return state
  }
}