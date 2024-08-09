/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'
import { getUserFromStorage } from '../../utils/getUserFromStorage';


const AuthRoutes = ({children}) => {
  const token = getUserFromStorage();
//   const isLogin = false;
  if(token){
    return children;
  }else{
    return (<h1>Not Authorized</h1>)
  }
}

export default AuthRoutes