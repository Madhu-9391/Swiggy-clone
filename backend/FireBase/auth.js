import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
export const docreateUserWithEmailAndPassword=async(EmailAuthCredential,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
};
export const doSignInWithEmailAndPassword=async(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password);
};
export const doSignInWithGoogle=async()=>{
    const provider=new GoogleAuthProvider(auth,provider);
    const result=await signInWithPopup(auth,provider);
return result;
};
export const doSignOut=()=>{
    return auth.signOut();
};