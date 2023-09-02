import './App.css';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SingleProductPage from './pages/SingleProductPage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import OrderCompletedRedirectPage from './pages/OrderCompletedRedirectPage';
import FavoritesPage from './pages/FavoritesPage';
import LeaveReviewPage from './pages/LeaveReviewPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLoginContext } from './components/login/LoginContext';
import axios from 'axios';
import ReviewsPage from './pages/ReviewsPage';

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
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/products/:productId' element={<SingleProductPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/cart/checkout' element={<CheckoutPage />} />
                    <Route path='/orders' element={<OrdersPage />} />
                    <Route path='/ordercompleted' element={<OrderCompletedRedirectPage />} />
                    <Route path='/favorites' element={<FavoritesPage />} />
                    <Route path='/review/:purchasedItemId' element={<LeaveReviewPage />} />
                    <Route path='/review/edit/:purchasedItemId' element={<LeaveReviewPage />} />
                    <Route path='/reviews' element={<ReviewsPage />} />

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
