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
        { path: '/admin/addnewproduct', element: <PostProductPage /> },
        { path: '/admin/addnewproduct/submitted', element: <ProductSubmittedPage /> },
        { path: '/admin/updateproduct', element: <PostProductPage /> },
        { path: '/admin/updateproduct/:productId', element: <PostProductPage /> },
        { path: '/admin/editproductspage', element: <EditProductsPage /> },
        { path: '/admin/allreviews', element: <AllReviewsPage /> },
        { path: '/admin/allorders', element: <AllOrdersPage /> },
        { path: '/admin/billing', element: <BillingPage /> }
    ];


    return (
        <BrowserRouter>
            <Routes>
                {routes && routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
                {/* <Route path='/' element={<HomePage />} />
                <Route path='/search/:searchTerm' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/about' element={<AboutPage />} />
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
                <Route path='/admin/addnewproduct/submitted' element={<ProductSubmittedPage />} />
                <Route path='/admin/updateproduct' element={<PostProductPage />} />
                <Route path='/admin/updateproduct/:productId' element={<PostProductPage />} />
                <Route path='/admin/editproductspage' element={<EditProductsPage />} />
                <Route path='/admin/allreviews' element={<AllReviewsPage />} />
                <Route path='/admin/allorders' element={<AllOrdersPage />} />
                <Route path='/admin/billing' element={<BillingPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
