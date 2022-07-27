import React, { useContext, useState } from 'react'
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../utils/auth';

function SignupScreen() {
  const [isAuthenticating,setIsAuthenticating]=useState(false);
  const authCtx= useContext(AuthContext);
  async function singupHandler({email,password}){
    setIsAuthenticating(true);
    try {
      const token =await createUser(email,password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication Failed',
        'Could not create user, please check your internet connection and try again later',
      );
    }
    
    setIsAuthenticating(false);
  }

  if(isAuthenticating){
    return <LoadingOverlay message={'Creating user...'}/>
  }

  return <AuthContent onAuthenticate={singupHandler}/>;
}

export default SignupScreen;