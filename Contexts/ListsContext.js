import { createContext, useState } from "react";

export const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [userLists, setUserLists] = useState([]);
  return (
    <ListsContext.Provider value={{ userLists, setUserLists }}>
      {children}
    </ListsContext.Provider>
  );
};
