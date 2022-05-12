import React, { useState, FC } from 'react';

interface IAuthContext {
  loggedIn: boolean;
  setLoggedIn?: (active: boolean) => void;
}

const defaultState = {
  loggedIn: false,
};

const AuthContext = React.createContext<IAuthContext>(defaultState);

const AuthProvider: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(defaultState.loggedIn);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
