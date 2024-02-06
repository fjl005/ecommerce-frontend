import { createContext, useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../components/miscellaneous/axios';

// First, create the context
const LoginContext = createContext();

// Then, create the Provider which will wrap the App.js file
export const LoginProvider = ({ children }) => {

    const [username, setUsername] = useState('');
    const [admin, setAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [loginMsg, setLoginMsg] = useState('');
    const [waitingCheckUser, setWaitingCheckUser] = useState(true);

    // Check if user is logged in. If so, set the username, admin, loggedIn
    const checkUser = async () => {
        try {
            const response = await axiosWithAuth.get('/users');
            setLoggedIn(true);
            setUsername(response.data.username);
            setAdmin(response.data.admin);
            setWaitingCheckUser(false);
        } catch (error) {
            console.log('Error: ', error);
            setLoggedIn(false);
            setUsername('');
            setAdmin(false);
            setWaitingCheckUser(false);
        } finally {
            setShowLoginButton(true);
        }
    };


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
    };

    useEffect(() => {
        checkUser();
    }, []);


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

