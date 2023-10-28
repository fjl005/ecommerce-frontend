import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../miscellaneous/axios';

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
