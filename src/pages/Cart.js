import NavbarApp from "../components/miscellaneous/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItem from "../components/cart/CartItem";
import CartItemMDB from "../components/cart/CartItemMDB";
import axios from 'axios';
import { Link } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import SpinningIcon from "../components/miscellaneous/SpinningIcon";
import { useCartContext } from "../components/cart/CartContext";

const Cart = () => {
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const {
        fetchCart,
        fetchSaved,
        itemsArrayId,
        savedLength,
        saveItemsArrayId,
        cartLength,
        setCartLength,
        saveLaterCartItem,
        moveBackToCart,
        loadingCartAndSaved,
        setLoadingCartAndSaved,
        removeCartItem,
        removeSavedItem,
    } = useCartContext();

    // const [itemsArrayId, setItemsArrayId] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [loadingCost, setLoadingCost] = useState(true);

    const [numSaveItems, setNumSaveItems] = useState(0);
    // const [saveItemsArrayId, setSaveItemsArrayId] = useState([]);

    useEffect(() => {
        fetchCart();
        fetchSaved();
    }, [])

    useEffect(() => {
        determineTotalCost();
    }, [cartLength]);

    // const fetchCart = async () => {
    //     try {
    //         const response = await axiosWithAuth.get('/cart');
    //         const cartData = response.data.cart;
    //         setItemsArrayId(cartData);
    //         setCartLength(cartData.length);
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // }

    // const fetchSaved = async () => {
    //     try {
    //         const response = await axiosWithAuth.get('/cart/saved');
    //         const savedItems = response.data.saved;
    //         setSaveItemsArrayId(savedItems);
    //         setNumSaveItems(savedItems.length);
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // }

    const determineTotalCost = async () => {
        try {
            setLoadingCost(true);
            let total = 0;
            console.log('items array: ', itemsArrayId);
            for (let item of itemsArrayId) {
                console.log('calculating...')
                const response = await axiosWithAuth.get(`/products/${item}`);
                const itemPrice = response.data.price;
                total += itemPrice;
            }
            setTotalCost(total);
            console.log('total cost: ', totalCost);
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setLoadingCost(false);
            setLoadingCartAndSaved(false);
        }
    }


    // const removeCartItem = async (productId) => {
    //     try {
    //         setLoadingCartAndSaved(true);
    //         await axiosWithAuth.delete(`/cart/${productId}`);
    //         await fetchCart();
    //         // setLoadingCartAndSaved(false);
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // };

    // const removeSavedItem = async (productId) => {
    //     try {
    //         setLoadingCartAndSaved(true);
    //         await axiosWithAuth.delete(`/cart/saved/${productId}`);
    //         await fetchSaved();
    //         setLoadingCartAndSaved(false);
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // };

    // const saveLaterCartItem = async (productId) => {
    //     try {
    //         setLoadingCartAndSaved(true);
    //         await axiosWithAuth.post(`/cart/saved/${productId}`);
    //         await fetchSaved();
    //         await fetchCart();
    //         // setLoadingCartAndSaved(false);
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // };

    // const moveBackToCart = async (productId) => {
    //     try {
    //         setLoadingCartAndSaved(true);
    //         await axiosWithAuth.post(`/cart/${productId}`);
    //         await fetchCart();
    //         await axiosWithAuth.delete(`/cart/saved/${productId}`);
    //         await fetchSaved();
    //         // setLoadingCartAndSaved(false);
    //     } catch (error) {
    //         console.log('error: ', error);
    //     }
    // };

    return (
        <>
            {loadingCartAndSaved && <LoadingOverlay />}
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
                        {cartLength > 0 && (
                            <h1>
                                Total Cost:
                                {loadingCost ? (
                                    <div style={{ marginLeft: '10px', display: 'inline-block' }}>
                                        <SpinningIcon size='1x' />
                                    </div>
                                ) : (
                                    <span> ${totalCost.toFixed(2)}</span>
                                )}
                            </h1>
                        )}
                    </Col>
                </Row>
            </Container>

            <Container style={{ marginTop: '150px' }}>
                <Row>
                    <Col>
                        {savedLength > 0 ?
                            saveItemsArrayId.map((arr, idx) => (
                                <>
                                    <h1>Items saved for later</h1>
                                    <CartItemMDB
                                        key={idx}
                                        productId={arr}
                                        isSaved={true}
                                        removeSavedItem={removeSavedItem}
                                        moveBackToCart={moveBackToCart}
                                    />
                                </>

                            )) : (
                                <h1>No Items saved for later</h1>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart