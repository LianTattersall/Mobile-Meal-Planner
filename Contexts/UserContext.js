import { createContext, useState } from "react";

export const LoggedIn = createContext();

export const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoggedIn.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoggedIn.Provider>
  );
};
