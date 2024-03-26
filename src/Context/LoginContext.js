import { createContext, useContext, useState } from 'react';

const LoginInfoContext = createContext();

export const LoginInfoProvider = ({ children }) => {
  const [email, setEmail] = useState("");

  return (
    <LoginInfoContext.Provider value={{email,setEmail}}>
      {children}
    </LoginInfoContext.Provider>
  );
};

export default LoginInfoContext 