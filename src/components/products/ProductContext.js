import React, { createContext, useContext, useState } from 'react';

// Create a new context named CartContext using the createContext, which will store and share cart-related data and functions.
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ProductContext.Provider value={{
            searchQuery,
            setSearchQuery,
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
