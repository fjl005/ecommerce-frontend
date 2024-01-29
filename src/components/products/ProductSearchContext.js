import React, { createContext, useContext, useState } from 'react';

const ProductSearchContext = createContext();

export const ProductSearchProvider = ({ children }) => {

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <ProductSearchContext.Provider value={{
            searchQuery,
            setSearchQuery,
        }}>
            {children}
        </ProductSearchContext.Provider>
    );
};

export const useProductSearchContext = () => useContext(ProductSearchContext);
