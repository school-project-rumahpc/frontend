import React from "react";
import DataStore from "../store/productStore";

const storeContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const dataStore = DataStore;
  return (
    <storeContext.Provider value={dataStore}>
        {children}
    </storeContext.Provider>
  );
};

export const useStore = ()=>React.useContext(storeContext)