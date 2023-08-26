import NavbarApp from "../components/miscellaneous/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItemMDB from "../components/cart/CartItemMDB";
import axios from 'axios';
import { Link } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";
import SpinningIcon from "../components/miscellaneous/SpinningIcon";
import { useCartContext } from "../components/cart/CartContext";
import { useLoginContext } from '../components/login/LoginContext';

const Cart = () => {

    const {
        // Fetch functions
        fetchCart,
        fetchSaved,

        // Array ID's
        cartItemsArrayId,
        savedItemsArrayId,

        // Lengths
        savedLength,
        cartLength,

        // Button functions
        saveLaterCartItem,
        moveBackToCart,
        removeCartItem,
        removeSavedItem,

        // Total Cost
        totalCost,
        determineTotalCost,

        // Loading
        loadingCartAndSaved,
        loadingCost,
    } = useCartContext();

    const { loggedIn, checkUser } = useLoginContext();

    useEffect(() => {
        checkUser();
        fetchCart();
        fetchSaved();
    }, []);

    // useEffect(() => {
    //     determineTotalCost();
    // }, [cartLength]);

    return (
        <>
            {loadingCartAndSaved && <LoadingOverlay />}
            <NavbarApp cartLength={cartLength} />
            <Container>
                <Row>
                    <Col>
                        {!loggedIn ? (
                            <h1>You must log in to access your Cart.</h1>
                        ) : cartLength === 0 ? (
                            <h1>Your cart is empty</h1>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h1>{cartLength} items in your cart.</h1>
                                <Link
                                    to={{
                                        pathname: `/cart/checkout`,
                                    }}
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

            {cartLength > 0 && cartItemsArrayId && cartItemsArrayId.map((productId, idx) => (
                <>
                    <CartItemMDB
                        key={idx}
                        productId={productId}
                        removeCartItem={removeCartItem}
                        saveLaterCartItem={saveLaterCartItem}
                        isSaved={false}
                    />
                </>
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
                        {!loggedIn ? (
                            <h1>You must log in to access your Items Saved for Later.</h1>
                        ) : savedLength > 0 ?
                            savedItemsArrayId.map((arr, idx) => (
                                <>
                                    <h1>Items Saved for Later</h1>
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