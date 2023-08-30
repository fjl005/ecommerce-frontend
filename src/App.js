import './App.css';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import SingleProduct from './pages/SingleProduct';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import OrderCompletedRedirect from './components/orders/OrderCompletedRedirect';
import Favorites from './pages/Favorites';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLoginContext } from './components/login/LoginContext';
import axios from 'axios';

function App() {
    const {
        username,
        setUsername,
        admin,
        setAdmin,
    } = useLoginContext();
    // const [username, setUsername] = useState('');
    // const [admin, setAdmin] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const checkUser = async () => {
        try {
            const response = await axiosWithAuth.get('/users');
            console.log('response: ', response);
            setUsername(response.data.username);
            setAdmin(response.data.admin)
        } catch (error) {
            console.error(error);
        }
    };

    // const fetchData = async () => {
    //     try {
    //         await checkUser();
    //         setPageLoading(false);
    //     } catch (error) {
    //         setPageLoading(false);
    //     }
    // };

    // Initiate checkLogin and checkAdmin at initial page render. Once completed, setPageLoading to false to make the Spinner disappear.
    useEffect(() => {


        // fetchData();

        // Create a setTimeout to rerun fetchData after 1 Hour, the duration of the cookie.
        const timerId = setTimeout(() => {
            checkUser();
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
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/products/:productId' element={<SingleProduct />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/cart/checkout' element={<Checkout />} />
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/ordercompleted' element={<OrderCompletedRedirect />} />
                    <Route path='/favorites' element={<Favorites />} />

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
