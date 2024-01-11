import './App.css';

import LoginPage from './pages/home/LoginPage';
import SignUpPage from './pages/home/SignUpPage';
import HomePage from './pages/home/HomePage';
import SingleProductPage from './pages/products/SingleProductPage';
import OrdersPage from './pages/orders/OrdersPage';
import CheckoutPage from './pages/cart/CheckoutPage';
import CartPage from './pages/cart/CartPage';
import OrderCompletedRedirectPage from './pages/orders/OrderCompletedRedirectPage';
import FavoritesPage from './pages/favorites/FavoritesPage';
import LeaveReviewPage from './pages/reviews/LeaveReviewPage';
import ReviewsPage from './pages/reviews/ReviewsPage';
import ProfileSettingsPage from './pages/home/ProfileSettingsPage';
import AdminPage from './pages/admin/AdminPage';
import PostProductPage from './pages/admin/PostProductPage';
import ProductSubmitted from './components/admin/ProductSubmitted';
import EditProductsPage from './pages/admin/EditProductsPage';
import AllReviewsPage from './pages/admin/AllReviewsPage';
import AllOrdersPage from './pages/admin/AllOrdersPage';
import BillingPage from './pages/admin/BillingPage';


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
                    <Route path='/search/:searchTerm' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/signup' element={<SignUpPage />} />
                    <Route path='/products/:productId' element={<SingleProductPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='/cart/checkout' element={<CheckoutPage />} />
                    <Route path='/orders' element={<OrdersPage />} />
                    <Route path='/ordercompleted/:orderId' element={<OrderCompletedRedirectPage />} />
                    <Route path='/favorites' element={<FavoritesPage />} />
                    <Route path='/review/:purchasedItemId' element={<LeaveReviewPage />} />
                    <Route path='/review/edit/:purchasedItemId' element={<LeaveReviewPage />} />
                    <Route path='/reviews' element={<ReviewsPage />} />
                    <Route path='/profilesettings' element={<ProfileSettingsPage />} />
                    <Route path='/admin' element={<AdminPage />} />
                    <Route path='/admin/addnewproduct' element={<PostProductPage />} />
                    <Route path='/admin/addnewproduct/submitted' element={<ProductSubmitted />} />
                    <Route path='/admin/updateproduct' element={<PostProductPage />} />
                    <Route path='/admin/updateproduct/:productId' element={<PostProductPage />} />
                    <Route path='/admin/editproductspage' element={<EditProductsPage />} />
                    <Route path='/admin/allreviews' element={<AllReviewsPage />} />
                    <Route path='/admin/allorders' element={<AllOrdersPage />} />
                    <Route path='/admin/billing' element={<BillingPage />} />

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
