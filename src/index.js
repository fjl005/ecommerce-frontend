import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './contexts/CartContext';
import { LoginProvider } from './contexts/LoginContext';
import { SavedItemProvider } from './contexts/SavedItemContext';
import { ProductSearchProvider } from './contexts/ProductSearchContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LoginProvider>
            <CartProvider>
                <SavedItemProvider>
                    <ProductSearchProvider>
                        <App />
                    </ProductSearchProvider>
                </SavedItemProvider>
            </CartProvider>
        </LoginProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
