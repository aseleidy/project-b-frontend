export const loginSuccess = (student) => {
  return {
    type: 'LOGIN_SUCCESS',
    student
  }
}

export const currentUser = (student) => {
  return {
    type: 'CURRENT_USER',
    student
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  }
}

