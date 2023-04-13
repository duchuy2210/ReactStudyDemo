import { auth } from 'database/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = {userInfo, setUserInfo};
  //Khi đăng nhập, đăng kí sẽ chạy vào useEffect này
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUserInfo(user)
    })
  },[])
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context == 'undefined') {
    throw new Error('useAuth must be call within AuthProvider');
  }
  return context
}
export { AuthProvider, useAuth };
