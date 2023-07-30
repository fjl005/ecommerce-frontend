import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SingleProduct from './components/products/SingleProduct';
import Cart from './pages/Cart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [admin, setAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    // Async Functions (check login, check admin).
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

    // Initiate checkLogin annd checkAdmin at initial page render. Once completed, setPageLoading to false to make the Spinner disappear.
    useEffect(() => {

        const fetchData = async () => {
            try {
                await checkUser();
                setPageLoading(false);
            } catch (error) {
                setPageLoading(false);
            }
        };
        fetchData();

        // Create a setTimeout to rerun fetchData after 1 Hour, the duration of the cookie.
        const timerId = setTimeout(() => {
            fetchData();
        }, 1000 * 60 * 60);

        // Clean up the timeout when the component unmounts
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <HomePage
                            username={username}
                            admin={admin}
                            setAdmin={setAdmin}
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                            pageLoading={pageLoading}
                        />
                    } />

                    <Route path='/login' element={
                        <LoginPage
                            username={username}
                            setUsername={setUsername}
                            loggedIn={loggedIn}
                            setLoggedIn={setLoggedIn}
                            setAdmin={setAdmin}
                            pageLoading={pageLoading}
                        />
                    } />
                    <Route path='/products/:productId' element={
                        <SingleProduct />
                    } />
                    <Route path='/cart/' element={
                        <Cart />
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
