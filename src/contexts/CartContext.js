import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../components/miscellaneous/axios';
import { useLoginContext } from './LoginContext';

const CartContext = createContext();
export const CartProvider = ({ children }) => {

    const { loggedIn } = useLoginContext();

    // Cart States
    const [cartItemsArrayId, setCartItemsArrayId] = useState([]);
    const [cartLength, setCartLength] = useState(0);

    // Total Cost States
    const [totalCost, setTotalCost] = useState(0);

    // Loading States
    const [loadingCartAndSaved, setLoadingCartAndSaved] = useState(false);
    const [loadingCost, setLoadingCost] = useState(true);

    const fetchCart = async () => {
        try {
            const response = await axiosWithAuth.get('/cart');
            const cartData = response.data.cart;
            setCartItemsArrayId(cartData);
            setCartLength(cartData.length);
        } catch (error) {
            console.log('error: ', error);
            setCartLength(0);
            setCartItemsArrayId(null);
        }
    }

    const determineTotalCost = async () => {
        try {
            setLoadingCost(true);
            let total = 0;

            if (cartItemsArrayId.length > 0) {
                for (let itemId of cartItemsArrayId) {
                    const response = await axiosWithAuth.get(`/products/${itemId}`);
                    const itemPrice = response.data.price;
                    total += itemPrice;
                }
                setTotalCost(total);
            } else {
                setTotalCost(0);
            }
            setLoadingCost(false);
            setLoadingCartAndSaved(false);
        } catch (error) {
            console.log('error: ', error);
            setLoadingCost(false);
            setLoadingCartAndSaved(false);
        }
    }

    useEffect(() => {
        if (loggedIn) {
            fetchCart();
        }
    }, [loggedIn]);

    useEffect(() => {
        determineTotalCost();
    }, [cartItemsArrayId]);

    const removeCartItem = async (cartItemId) => {
        try {
            setLoadingCartAndSaved(true);
            await axiosWithAuth.delete(`/cart/${cartItemId}`);
            await fetchCart();
            setLoadingCartAndSaved(false);
        } catch (error) {
            console.log('error: ', error);
        }
    };


    return (
        <CartContext.Provider value={{
            // Fetch
            fetchCart,
            cartItemsArrayId,

            // Lengths
            cartLength,
            setCartLength,

            // Cart Item Actions
            removeCartItem,

            // Total Cost
            totalCost,
            determineTotalCost,

            // Loading
            loadingCartAndSaved,
            setLoadingCartAndSaved,
            loadingCost,
            setLoadingCost,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
