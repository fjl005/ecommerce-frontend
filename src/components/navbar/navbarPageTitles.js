const ORDERS = 'Orders';
const FAVORITES = 'Favorites';
const REVIEWS = 'Reviews';
const SETTINGS = 'Settings';
const SIGNUP = 'Sign Up';
const ABOUT = 'About';
const CART = 'Cart';
const LOGIN = 'Login';
const LOGOUT = 'Logout';
const ADMIN = 'Admin';
const ADD_PRODUCT = 'Add Product';
const EDIT_PRODUCTS = 'Edit Products';
const ALL_ORDERS = 'All Orders';
const ALL_REVIEWS = 'All Reviews';
const BILLING = 'Billing';

export const NAV_TITLE_MATCH = {
    orders: ORDERS,
    favorites: FAVORITES,
    reviews: REVIEWS,
    settings: SETTINGS,
    signup: SIGNUP,
    about: ABOUT,
    cart: CART,
    login: LOGIN,
    logout: LOGOUT,
    admin: ADMIN,
    addproduct: ADD_PRODUCT,
    editproducts: EDIT_PRODUCTS,
    allorders: ALL_ORDERS,
    allreviews: ALL_REVIEWS,
    billing: BILLING,
};

export const NAV_TITLE = {
    loggedIn: [
        {
            title: ORDERS,
            link: '/orders',
        },
        {
            title: FAVORITES,
            link: '/favorites'
        },
        {
            title: REVIEWS,
            link: '/reviews',
        },
    ],

    signup: {
        title: SIGNUP,
        link: '/signup',
    },

    about: {
        title: ABOUT,
        link: '/about',
    },

    login: {
        title: LOGIN,
        link: '/login',
    },

    cart: {
        title: CART,
        link: '/cart',
    },

    admin: {
        title: ADMIN,
        link: '/admin',
    },

    profileBtn: [
        {
            title: SETTINGS,
            link: '/profilesettings',
            logoutTrigger: false,
        },
        {
            title: SIGNUP,
            link: '/signup',
            logoutTrigger: false,
        },
        {
            title: LOGOUT,
            link: '/login',
            logoutTrigger: true,
        },
    ],

    adminPages: [
        {
            title: ADD_PRODUCT,
            link: '/admin/addnewproduct',
        },
        {
            title: EDIT_PRODUCTS,
            link: '/admin/editproductspage',
        },
        {
            title: ALL_ORDERS,
            link: '/admin/allorders',
        },
        {
            title: ALL_REVIEWS,
            link: '/admin/allreviews',
        },
        {
            title: BILLING,
            link: '/admin/billing'
        },
    ],
};