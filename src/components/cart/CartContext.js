import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a new context named CartContext using the createContext, which will store and share cart-related data and functions.
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const [tooltipAddCartSignin, setTooltipAddCartSignin] = useState(false);
    const [tooltipAddCartSuccess, setTooltipAddCartSuccess] = useState(false);

    const [itemsArrayId, setItemsArrayId] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [loadingCartAndSaved, setLoadingCartAndSaved] = useState(false);
    const [loadingCost, setLoadingCost] = useState(true);

    const [cartLength, setCartLength] = useState(0);
    const [savedLength, setSavedLength] = useState(0);
    const [saveItemsArrayId, setSaveItemsArrayId] = useState([]);
    const [savedItems, setSavedItems] = useState([]);



    useEffect(() => {
        fetchCart();
        fetchSaved();
    }, [])

    useEffect(() => {
        determineTotalCost();
    }, [itemsArrayId]);

    const fetchCart = async () => {
        try {
            const response = await axiosWithAuth.get('/cart');
            const cartData = response.data.cart;
            setItemsArrayId(cartData);
            setCartLength(cartData.length);
        } catch (error) {
            console.log('error: ', error);
            setCartLength(0);
            setCartItems(null);
            setItemsArrayId(null);
        }
    }

    const fetchSaved = async () => {
        try {
            const response = await axiosWithAuth.get('/cart/saved');
            const savedItems = response.data.saved;
            setSaveItemsArrayId(savedItems);
            setSavedLength(savedItems.length);
        } catch (error) {
            console.log('error: ', error);
            setCartLength(0);
            setItemsArrayId(null);
        }
    }

    const determineTotalCost = async () => {
        try {
            setLoadingCost(true);
            let total = 0;
            console.log('items array: ', itemsArrayId);
            for (let item of itemsArrayId) {
                const response = await axiosWithAuth.get(`/products/${item}`);
                const itemPrice = response.data.price;
                console.log('item price: ', itemPrice)
                total += itemPrice;
            }
            setTotalCost(total);
            console.log('total cost: ', totalCost);
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setLoadingCost(false);
            setLoadingCartAndSaved(false);
        }
    }

    const addItemToCart = async (productId) => {
        try {
            await axiosWithAuth.post(`/cart/${productId}`);
            setTooltipAddCartSuccess(true);
            setTimeout(() => {
                setTooltipAddCartSuccess(false);
            }, 3000);
            setCartLength(cartLength + 1);
        } catch (error) {
            console.log('error: ', error);
            // console.log('response: ', error.response.data);
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
            // setLoadingCartAndSaved(false);
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
            // setLoadingCartAndSaved(false);
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
            // setLoadingCartAndSaved(false);
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            fetchCart,
            fetchSaved,
            itemsArrayId,
            saveItemsArrayId,
            savedLength,
            setSavedLength,
            tooltipAddCartSignin,
            tooltipAddCartSuccess,
            fetchCart,
            addItemToCart,
            removeCartItem,
            removeSavedItem,
            saveLaterCartItem,
            moveBackToCart,
            loadingCartAndSaved,
            setLoadingCartAndSaved,
            cartLength,
            setCartLength,
            determineTotalCost,
            totalCost,
            loadingCost,
            setLoadingCost
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
