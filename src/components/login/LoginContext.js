import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../miscellaneous/axiosWithAuth';
// import { useCartContext } from '../cart/CartContext';

// First, create the context
const LoginContext = createContext();

// Then, create the Provider which will wrap the App.js file
export const LoginProvider = ({ children }) => {
    // const { cartLength, setCartLength, setSavedLength } = useCartContext();

    const [username, setUsername] = useState('');
    const [admin, setAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [loginMsg, setLoginMsg] = useState('');
    const [waitingCheckUser, setWaitingCheckUser] = useState(true);

    const checkUser = async () => {
        try {
            const response = await axiosWithAuth.get('/users');
            console.log('response from checkUser in LoginContext: ', response);
            setLoggedIn(true);
            setUsername(response.data.username);
            setAdmin(response.data.admin);
            setWaitingCheckUser(false);
        } catch (error) {
            console.error(error);
            setLoggedIn(false);
            setUsername('');
            setAdmin(false);
            setWaitingCheckUser(false);
        } finally {
            setShowLoginButton(true);
        }
    };

    useEffect(() => {
        checkUser();

        // Create a setTimeout to rerun fetchData after 1 Hour, the duration of the cookie.
        const timerId = setTimeout(() => {
            checkUser();
        }, 1000 * 60 * 60);

        // Clean up the timeout when the component unmounts
        return () => {
            clearTimeout(timerId);
        };

    }, []);


    const triggerLogout = async () => {
        try {
            const response = await axiosWithAuth.post('/users/logout');
            if (response) {
                setLoggedIn(false);
                checkUser();
                setLoginMsg(`You have successfully logged out. Thank you for visiting!`);

                setTimeout(() => {
                    setLoginMsg('');
                }, 3000)
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }


    return (
        <LoginContext.Provider value={{
            loggedIn,
            setLoggedIn,
            checkUser,
            username,
            setUsername,
            admin,
            setAdmin,
            showLoginButton,
            setShowLoginButton,
            loginMsg,
            setLoginMsg,
            triggerLogout,
            waitingCheckUser
        }}>
            {children}
        </LoginContext.Provider>
    );
};

// Lastly, export the useContext so that other pages can use this context
export const useLoginContext = () => useContext(LoginContext);

