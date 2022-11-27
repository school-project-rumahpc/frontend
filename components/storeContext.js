import React from "react";
import RootStore from "../store/rootStore";

const storeContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const rootStore = RootStore;
  return (
    <storeContext.Provider value={rootStore}>
        {children}
    </storeContext.Provider>
  );
};

export const useStore = ()=>React.useContext(storeContext)