import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SingleProduct from './pages/SingleProduct';
import SingleProductMDB from './pages/SingleProductMDB';
import Cart from './pages/Cart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [username, setUsername] = useState('');
    const [admin, setAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [cartLength, setCartLength] = useState(0);

    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

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

    const fetchData = async () => {
        try {
            await checkUser();
            setPageLoading(false);
        } catch (error) {
            setPageLoading(false);
        }
    };

    const checkCartLength = async () => {
        try {
            const response = await axiosWithAuth.get('/cart');
            const cartData = response.data.cart;
            console.log('this is from app.js. the cart data is: ', cartData);
            setCartLength(cartData.length);
            console.log('this is from app.js. the cart length is now: ', cartLength)
        } catch (error) {
            console.log('There was an error checking the cart length from App.js: ', error);
        }
    }

    // Initiate checkLogin annd checkAdmin at initial page render. Once completed, setPageLoading to false to make the Spinner disappear.
    useEffect(() => {

        fetchData();
        checkCartLength();

        // Create a setTimeout to rerun fetchData after 1 Hour, the duration of the cookie.
        const timerId = setTimeout(() => {
            fetchData();
        }, 1000 * 60 * 60);

        // Clean up the timeout when the component unmounts
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    useEffect(() => {
        checkCartLength();
    }, [cartLength])

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
                            cartLength={cartLength}
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
                            cartLength={cartLength}
                        />
                    } />
                    <Route path='/products/:productId' element={
                        // <SingleProduct />
                        <SingleProductMDB
                            cartLength={cartLength}
                            setCartLength={setCartLength}
                        />
                    } />
                    <Route path='/cart' element={
                        <Cart
                            cartLength={cartLength}
                            setCartLength={setCartLength}
                        />
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
