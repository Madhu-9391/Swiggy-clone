import React, {useContext,useEffect, useState} from 'react';
import { auth } from '../FireBase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doSignInWithEmailAndPassword,doSignInWithGoogle,doSignOut } from '../FireBase/auth';
import useAuth from '../Context/AuthContext';
const AuthContext=React.createContext();
export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({children}){
    const [currentUser,setCurrentUser]=useState(null);
    const [userLoggedIn,setUserLoggedIn]=useState(false);
    const [loading,setLoading]=useState(true);

}
useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,initializeUser);
    return unsubscribe;
},[])
async function  initializeUser(user) {
    if(user){
setCurrentUser(...user);
    }
    else{
        setCurrentUser(null);
        setUserLoggedIn(false);
    }
    setLoading(false);

    
}
const value={
    currentUser,userLoggedIn,loading
}