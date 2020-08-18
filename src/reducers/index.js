import React from 'react';
import { combineReducers } from 'redux';
import auth from './auth';
import courses from './courses';
import 'semantic-ui-css/semantic.min.css'

export default combineReducers({
  auth: auth,
  courses: courses,
})