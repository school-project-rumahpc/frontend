import React from 'react';
import ProductStore from '../store/productStore';

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const productStore = ProductStore
  return (
    <StoreContext.Provider value={productStore}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => React.useContext(StoreContext);
