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
import ProductSubmittedPage from './pages/admin/ProductSubmittedPage';
import EditProductsSelection from './pages/admin/EditProductsSelection';
import EditProductsPage from './pages/admin/EditProductsPage';
import AllReviewsPage from './pages/admin/AllReviewsPage';
import AllOrdersPage from './pages/admin/AllOrdersPage';
import BillingPage from './pages/admin/BillingPage';
import AboutPage from './pages/home/AboutPage';


import { useLoginContext } from './contexts/LoginContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

    const { checkUser } = useLoginContext();

    useEffect(() => {
        checkUser();
    }, []);


    const routes = [
        { path: '/', element: <HomePage /> },
        { path: '/search/:searchTerm', element: <HomePage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/signup', element: <SignUpPage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '/products/:productId', element: <SingleProductPage /> },
        { path: '/cart', element: <CartPage /> },
        { path: '/cart/checkout', element: <CheckoutPage /> },
        { path: '/orders', element: <OrdersPage /> },
        { path: '/ordercompleted/:orderId', element: <OrderCompletedRedirectPage /> },
        { path: '/favorites', element: <FavoritesPage /> },
        { path: '/review/:purchasedItemId', element: <LeaveReviewPage /> },
        { path: '/review/edit/:purchasedItemId', element: <LeaveReviewPage /> },
        { path: '/reviews', element: <ReviewsPage /> },
        { path: '/profilesettings', element: <ProfileSettingsPage /> },
        { path: '/admin', element: <AdminPage /> },
        // { path: '/admin/addnewproduct', element: <PostProductPage /> },
        { path: '/admin/addnewproduct', element: <PostProductPage /> },
        { path: '/admin/addnewproduct/submitted', element: <ProductSubmittedPage /> },
        { path: '/admin/updateproduct', element: <EditProductsPage /> },
        { path: '/admin/updateproduct/:productId', element: <EditProductsPage /> },
        { path: '/admin/editproductsselection', element: <EditProductsSelection /> },
        { path: '/admin/allreviews', element: <AllReviewsPage /> },
        { path: '/admin/allorders', element: <AllOrdersPage /> },
        { path: '/admin/billing', element: <BillingPage /> },
        { path: '/admin/postproducttesting', element: <PostProductPage /> }
    ];


    return (
        <BrowserRouter>
            <Routes>
                {routes && routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
