import { createContext, useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../components/miscellaneous/axios';

const LoginContext = createContext();
export const LoginProvider = ({ children }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loginMsg, setLoginMsg] = useState('');

    // Check if user is logged in. If so, set the username, admin, loggedIn
    const checkUser = async () => {
        try {
            const response = await axiosWithAuth.get('/users');
            setLoggedIn(true);
            setUsername(response.data.username);
            setAdmin(response.data.admin);
        } catch (error) {
            console.log('Error: ', error);
            setLoggedIn(false);
            setUsername('');
            setAdmin(false);
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

    return (
        <LoginContext.Provider value={{
            loggedIn,
            setLoggedIn,
            checkUser,
            username,
            setUsername,
            password,
            setPassword,
            admin,
            setAdmin,
            loginMsg,
            setLoginMsg,
            triggerLogout,
        }}>
            {children}
        </LoginContext.Provider>
    );
};

// Lastly, export the useContext so that other pages can use this context
export const useLoginContext = () => useContext(LoginContext);

