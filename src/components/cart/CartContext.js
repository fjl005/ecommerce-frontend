import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a new context named CartContext using the createContext, which will store and share cart-related data and functions.
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    // Tooltip States (when clicking "add to cart")
    const [tooltipAddCartSignin, setTooltipAddCartSignin] = useState(false);
    const [tooltipAddCartSuccess, setTooltipAddCartSuccess] = useState(false);

    // Cart States
    const [cartItemsArrayId, setCartItemsArrayId] = useState([]);
    const [cartLength, setCartLength] = useState(0);

    // Saved States
    const [savedItemsArrayId, setSavedItemsArrayId] = useState([]);
    const [savedLength, setSavedLength] = useState(0);

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

    const fetchSaved = async () => {
        try {
            const response = await axiosWithAuth.get('/cart/saved');
            const savedItems = response.data.saved;
            setSavedItemsArrayId(savedItems);
            setSavedLength(savedItems.length);
        } catch (error) {
            console.log('error: ', error);
            setSavedLength(0);
            setSavedItemsArrayId(null);
        }
    }

    const determineTotalCost = async () => {
        try {
            console.log('im being run in determinetotalcost')
            setLoadingCost(true);
            let total = 0;
            if (cartItemsArrayId.length > 0) {
                for (let item of cartItemsArrayId) {
                    const response = await axiosWithAuth.get(`/products/${item}`);
                    const itemPrice = response.data.price;
                    console.log('item price: ', itemPrice)
                    total += itemPrice;
                }
                console.log('here')
                console.log('total cost: ', total)
                setTotalCost(total);
                setLoadingCost(false);
                setLoadingCartAndSaved(false);
            }
        } catch (error) {
            console.log('error: ', error);
            setLoadingCost(false);
            setLoadingCartAndSaved(false);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        determineTotalCost();
    }, [cartLength]);

    const addItemToCart = async (productId) => {
        try {
            await axiosWithAuth.post(`/cart/${productId}`);
            setTooltipAddCartSuccess(true);
            setTimeout(() => {
                setTooltipAddCartSuccess(false);
            }, 3000);
            // setCartLength(cartLength + 1);
            fetchCart();
        } catch (error) {
            console.log('error: ', error);
            if (error.response.data === 'You must log in before accessing this page') {
                setTooltipAddCartSignin(true);
                setTimeout(() => {
                    setTooltipAddCartSignin(false);
                }, 3000);
            }
        }
    };


    const removeCartItem = async (cartItemId) => {
        try {
            setLoadingCartAndSaved(true);
            await axiosWithAuth.delete(`/cart/${cartItemId}`);
            await fetchCart();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const removeSavedItem = async (cartItemId) => {
        try {
            setLoadingCartAndSaved(true);
            await axiosWithAuth.delete(`/cart/saved/${cartItemId}`);
            await fetchSaved();
            setLoadingCartAndSaved(false);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const saveLaterCartItem = async (cartItemId) => {
        try {
            setLoadingCartAndSaved(true);
            await axiosWithAuth.post(`/cart/saved/${cartItemId}`);
            await fetchSaved();
            await fetchCart();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const moveBackToCart = async (cartItemId) => {
        try {
            setLoadingCartAndSaved(true);
            await axiosWithAuth.post(`/cart/${cartItemId}`);
            await fetchCart();
            await axiosWithAuth.delete(`/cart/saved/${cartItemId}`);
            await fetchSaved();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <CartContext.Provider value={{
            // Fetch Functions
            fetchCart,
            fetchSaved,

            // Array ID's
            cartItemsArrayId,
            savedItemsArrayId,

            // Lengths
            savedLength,
            setSavedLength,
            cartLength,
            setCartLength,

            // Tooltips
            tooltipAddCartSignin,
            tooltipAddCartSuccess,

            // Button Functions
            addItemToCart,
            removeCartItem,
            removeSavedItem,
            saveLaterCartItem,
            moveBackToCart,

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
