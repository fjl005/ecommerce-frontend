import { createContext, useContext, useState } from "react";
import { useCartContext } from "./CartContext";
import { axiosWithAuth } from "../miscellaneous/axios";

/*

    Context: allows you to create a centralized place to store and share values across your application.

    Provider: a component that, using the Context API, supplies the values to the context and allows its descendants to consume those values.

*/

// FIRST, create the Context, which will contain all the "values" you want the app to access, such as functions and variables.
const SavedItemContext = createContext();


// SECOND, create the Provider, which will be set up in index.js for the <App /> to use. The Provider "provides" the context with the values it should contain (fetchSaved, fetchCart, etc.).
export const SavedItemProvider = ({ children }) => {

    // In SavedItemProvider, we write all the code we would want children components (namely anything in App.js) to use. This would include savedLength, fetchSaved, etc. We have to define what they are here, and they will be provided as values in the return JSX code.
    const { fetchCart, setLoadingCartAndSaved } = useCartContext();

    const [savedItemsArrayId, setSavedItemsArrayId] = useState([]);
    const [savedLength, setSavedLength] = useState(0);

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
        // This special syntax is provided by React. Return the Context, use .Provider, and include all the methods, states, etc. as values.
        <SavedItemContext.Provider value={{
            // Fetched
            fetchSaved,
            savedItemsArrayId,

            // Lengths
            savedLength,
            setSavedLength,

            // Saved Item Actions
            removeSavedItem,
            saveLaterCartItem,
            moveBackToCart,

        }}
        >
            {/* Children is used here so that all the descendants of SavedItemProvider can access these values. */}
            {children}
        </SavedItemContext.Provider>
    )
}

// Third, export the useContext line for providing the actual syntax that following components can use. Exporting useContext itself will save us the trouble of having to write useContext(SavedItemContext) every time. 
export const useSavedItemContext = () => useContext(SavedItemContext);