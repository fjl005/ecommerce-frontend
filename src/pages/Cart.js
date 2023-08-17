import NavbarApp from "../components/miscellaneous/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItem from "../components/cart/CartItem";
import CartItemMDB from "../components/cart/CartItemMDB";
import axios from 'axios';
import { Link } from "react-router-dom";

const Cart = ({ cartLength, setCartLength }) => {
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    // const [numItems, setNumItems] = useState(0);
    const [itemsArrayId, setItemsArrayId] = useState([]);
    const [totalCost, setTotalCost] = useState(0);


    const [numSaveItems, setNumSaveItems] = useState(0);
    const [saveItemsArrayId, setSaveItemsArrayId] = useState([]);

    useEffect(() => {
        fetchCart();
        fetchSaved();
    }, [])

    useEffect(() => {
        determineTotalCost();
    }, [itemsArrayId]);

    const fetchCart = async () => {
        try {
            const response = await axiosWithAuth.get('/cart');
            const cartData = response.data.cart;
            console.log('cart data: ', cartData);
            setItemsArrayId(cartData);
            setCartLength(cartData.length);
            await determineTotalCost();
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const fetchSaved = async () => {
        try {
            const response = await axiosWithAuth.get('/cart/saved');
            const savedItems = response.data.saved;
            setSaveItemsArrayId(savedItems);
            setNumSaveItems(savedItems.length);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const determineTotalCost = async () => {
        try {
            let total = 0; // Initialize the total
            for (let item of itemsArrayId) {
                const response = await axiosWithAuth.get(`/products/${item}`);
                const itemPrice = response.data.price;
                total += itemPrice;
            }
            setTotalCost(total);
            console.log('total cost: ', totalCost);
        } catch (error) {
            console.log('error: ', error);
        }
    }


    const removeCartItem = async (productId) => {
        try {
            await axiosWithAuth.delete(`/cart/${productId}`);
            await fetchCart();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const removeSavedItem = async (productId) => {
        try {
            await axiosWithAuth.delete(`/cart/saved/${productId}`);
            await fetchSaved();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const saveLaterCartItem = async (productId) => {
        try {
            await axiosWithAuth.post(`/cart/saved/${productId}`);
            await fetchSaved();
            await fetchCart();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    const moveBackToCart = async (productId) => {
        try {
            await axiosWithAuth.post(`/cart/${productId}`);
            await fetchCart();
            await axiosWithAuth.delete(`/cart/saved/${productId}`);
            await fetchSaved();
        } catch (error) {
            console.log('error: ', error);
        }
    };

    return (
        <>
            <NavbarApp cartLength={cartLength} />
            <Container>
                <Row>
                    <Col>
                        {cartLength === 0 ? (
                            <h1>Your cart is empty</h1>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h1>{cartLength} items in your cart.</h1>
                                <Link
                                    to={{
                                        pathname: `/cart/checkout`,
                                        search: `?items=${itemsArrayId.join(',')}&totalCost=${totalCost.toFixed(2)}`
                                    }}
                                    // target='_blank' 
                                    style={{
                                        textDecoration: 'none',
                                        color: 'black'
                                    }}
                                >
                                    <Button>Checkout</Button>
                                </Link>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            {cartLength > 0 && itemsArrayId.map((arr, idx) => (
                <CartItemMDB
                    key={idx}
                    productId={arr}
                    removeCartItem={removeCartItem}
                    saveLaterCartItem={saveLaterCartItem}
                    isSaved={false}
                />
            ))}

            <Container>
                <Row>
                    <Col>
                        <h1>Total Cost: ${totalCost.toFixed(2)}</h1>
                    </Col>
                </Row>
            </Container>

            <Container style={{ marginTop: '150px' }}>
                <Row>
                    <Col>
                        <h1>Items saved for later</h1>
                        {numSaveItems > 0 ?
                            saveItemsArrayId.map((arr, idx) => (
                                <CartItemMDB
                                    key={idx}
                                    productId={arr}
                                    isSaved={true}
                                    removeSavedItem={removeSavedItem}
                                    moveBackToCart={moveBackToCart}
                                />
                            )) : (
                                <h3>None</h3>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart