import { createContext, useContext, useState } from "react";
import { useCartContext } from "./CartContext";
import { axiosWithAuth } from "../components/miscellaneous/axios";

/*
    Context: allows you to create a centralized place to store and share values across your application.
    Provider: a component that, using the Context API, supplies the values to the context and allows its descendants to consume those values.

    Think of it like this: you can create the context and have a child component use the context, BUT you need to 'provide' it so that React knows where to grab the context for you. If you don't provide the context, React will use the default value specified in createContext(). Currently in our code, there is no defined default value (just empty parenthesis).
*/

const SavedItemContext = createContext();

export const SavedItemProvider = ({ children }) => {
    const { fetchCart, setLoadingCartAndSaved } = useCartContext();

    const [savedItemsArrayId, setSavedItemsArrayId] = useState([]);
    const [savedLength, setSavedLength] = useState(0);
    const [favoritesLoadingOverlay, setFavoritesLoadingOverlay] = useState(false);

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
            setLoadingCartAndSaved(false);
        } catch (error) {
            console.log('error: ', error);
            setLoadingCartAndSaved(false);
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
        // This special syntax is provided by React. Return the Context, use .Provider, and include all the methods, states, etc. as values.
        <SavedItemContext.Provider value={{
            fetchSaved,
            savedItemsArrayId,
            savedLength,
            setSavedLength,
            removeSavedItem,
            saveLaterCartItem,
            moveBackToCart,
            favoritesLoadingOverlay,
            setFavoritesLoadingOverlay,
        }}
        >
            {children}
        </SavedItemContext.Provider>
    )
}

export const useSavedItemContext = () => useContext(SavedItemContext);