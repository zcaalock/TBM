//import users from '../apis/server'
import axios from 'axios'
import history from '../history'
import * as types from './types'

export const loginUser = (userData, history) => async (dispatch) => {
  
  axios
    .post('/login', userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);      
      dispatch(getUserData());
      dispatch({ type: types.CLEAR_ERRORS });
      history.push('/mypulses');
    })
    .catch((err) => {
      dispatch({
        type: types.SET_ERRORS,
        payload: err.response.data
      });
    });
};


export const signupUser = (newUserData, history) => (dispatch) => {
  
  dispatch({ type: types.LOADING_UI });
  axios
    .post('/signup', newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);      
      dispatch(getUserData());
      dispatch({ type: types.CLEAR_ERRORS });
      history.push('/mypulses');
    })
    .catch((err) => {
      dispatch({
        type: types.SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: types.SET_UNAUTHENTICATED });
  history.push('/')
};

export const getUserData = () => (dispatch) => {  
  dispatch({ type: types.LOADING_USER });
  axios
    .get('/user')
    .then((res) => {      
      dispatch({
        type: types.SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: types.LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: types.LOADING_USER });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));};


const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;  
};
