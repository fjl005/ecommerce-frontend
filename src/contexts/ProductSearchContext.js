import React, { createContext, useContext, useState } from 'react';
import { axiosWithAuth } from '../components/miscellaneous/axios';

const ProductSearchContext = createContext();

export const ProductSearchProvider = ({ children }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const fetchProduct = async (productId, setData, setDataExists, deleteURL) => {
        try {
            const response = await axiosWithAuth.get(`/products/${productId}`);
            setData(response.data);

            if (setDataExists) {
                setDataExists(true);
            }

            return response.data;
        } catch (error) {
            if (setDataExists) {
                setDataExists(false);
            }

            if (deleteURL) {
                await axiosWithAuth.delete(deleteURL);
            }

            if (error.response.data.message === 'No Product') {
                setData({ name: 'Product Deleted' });
            }

            console.log('error: ', error);
        }
    }

    return (
        <ProductSearchContext.Provider value={{
            searchQuery,
            setSearchQuery,
            fetchProduct,
        }}>
            {children}
        </ProductSearchContext.Provider>
    );
};

export const useProductSearchContext = () => useContext(ProductSearchContext);
