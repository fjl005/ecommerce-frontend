import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// First, create the context
const LoginContext = createContext();

// Then, create the Provider which will wrap the App.js file
export const LoginProvider = ({ children }) => {
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const [username, setUsername] = useState('');
    const [admin, setAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const checkUser = async () => {
        try {
            const response = await axiosWithAuth.get('/users');
            console.log('response: ', response);
            setLoggedIn(true);
            setUsername(response.data.username);
            setAdmin(response.data.admin)
        } catch (error) {
            console.error(error);
            setLoggedIn(false);
            setUsername('');
            setAdmin(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, [])

    return (
        <LoginContext.Provider value={{
            loggedIn,
            setLoggedIn,
            username,
            setUsername,
            admin,
            setAdmin
        }}>
            {children}
        </LoginContext.Provider>
    );
};

// Lastly, export the useContext so that other pages can use this context
export const useLoginContext = () => useContext(LoginContext);

