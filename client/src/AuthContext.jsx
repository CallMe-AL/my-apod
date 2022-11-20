import React, { useContext } from 'react';

const AuthContext = React.createContext();

// allows us to share value of user's state to all children of AuthContext.Provider
export function AuthProvider({ children, value }) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// allows us to easily access value passed to AuthContext.Provider
// to use in a component, extract value like so:
// const {currentUser} = useAuthValue()
export function useAuthValue() {
  return useContext(AuthContext);
}