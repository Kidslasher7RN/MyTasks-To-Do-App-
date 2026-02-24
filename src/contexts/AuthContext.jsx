import {useState} from "react";
import {createContext} from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [authSession, setAuthSession] = useState(null);
  return (
    <AuthContext.Provider value={{authSession, setAuthSession}}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthInfo = AuthContext;
export default AuthProvider;
