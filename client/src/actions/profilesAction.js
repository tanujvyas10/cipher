import axios from 'axios'

import {GET_PROFILE,PROFILE_LOADING,GET_ERRORS, GET_PROFILES, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER} from './types'

//get current profile

export const getCurrentProfile = () => dispatch =>{
   dispatch(setProfileLoading())
    axios.get("/api/profile")
    .then(res=>{
        dispatch({
            type:GET_PROFILE,
              payload :res.data
        })
    })
    .catch(err=>{
        dispatch({
            type:GET_PROFILE,
              payload :{}
        })
    })
   
}
//profile loading

export const setProfileLoading = ()=> {
    return {
        type:PROFILE_LOADING
    }
}


// Create Profile
export const createProfile = (profileData, history) => dispatch => {
    axios
      .post('/api/profile', profileData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

//Clear the profile
export const clearCurrentProfile = ()=> {
    return {
        type:CLEAR_CURRENT_PROFILE
    }
}


