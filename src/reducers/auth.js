export default function auth(state=null, action) {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return action.student
    case 'LOGOUT_USER':
      return null 
    case 'CURRENT_USER':
      return action.student
    default: 
      return state
  }
}