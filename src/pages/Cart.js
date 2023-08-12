import NavbarApp from "../components/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItem from "../components/cart/CartItem";
import CartItemMDB from "../components/cart/CartItemMDB";
import axios from 'axios';

const Cart = () => {
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const [numItems, setNumItems] = useState(0);
    const [itemsArrayId, setItemsArrayId] = useState([]);

    const [numSaveItems, setNumSaveItems] = useState(0);
    const [saveItemsArrayId, setSaveItemsArrayId] = useState([]);

    // Soon to be obsolete
    const [itemsArray, setItemsArray] = useState([]);
    const [saveItemsArray, setSaveItemsArray] = useState([]);

    useEffect(() => {
        fetchCart();
        fetchSaved();
    }, [])

    const fetchCart = async () => {
        try {
            const response = await axiosWithAuth.get('/cart');
            const cartData = response.data.cart;
            setItemsArrayId(cartData);
            setNumItems(cartData.length);
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
            console.log('save items array: ', savedItems);
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
            await fetchCart();
            await fetchSaved();
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
            <NavbarApp cartNumber={numItems} />
            <Container>
                <Row>
                    <Col>
                        {numItems === 0 ? (
                            <h1>Your cart is empty</h1>
                        ) : (
                            <h1>{numItems} items in your cart.</h1>
                        )}

                        <Button onClick={() => setNumItems(numItems + 1)}>+1</Button>

                        {numItems > 0 && (
                            <Button onClick={() => setNumItems(numItems - 1)}>-1</Button>
                        )}
                    </Col>
                </Row>
            </Container>

            {numItems > 0 && itemsArrayId.map((arr, idx) => (
                <CartItemMDB
                    key={idx}
                    position={idx}
                    productId={arr}
                    removeCartItem={removeCartItem}
                    saveLaterCartItem={saveLaterCartItem}
                    isSaved={false}
                />
            ))}

            <Container style={{ marginTop: '150px' }}>
                <Row>
                    <Col>
                        <h1>Items saved for later</h1>
                        {numSaveItems > 0 ?
                            saveItemsArrayId.map((arr, idx) => (
                                <CartItemMDB
                                    key={idx}
                                    position={idx}
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