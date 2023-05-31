import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
function AuthProvider(props) {
  const [user, setUser] = useState({
    id: 1,
    name: 'Đức Huy',
    email: 'dhuy221001@gmail.com',
    avatar:"https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg"
  });
  return <AuthContext.Provider value={{user, setUser}} {...props}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if(context===undefined){
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export {AuthProvider, useAuth}
