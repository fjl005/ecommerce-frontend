import NavbarApp from "../components/navbar/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItem from "../components/cart/CartItem";
import { Link } from "react-router-dom";
import LoadingOverlay from "../components/miscellaneous/LoadingOverlay";
import SpinningIcon from "../components/miscellaneous/SpinningIcon";
import { useCartContext } from "../components/cart/CartContext";
import { useLoginContext } from '../components/login/LoginContext';

const CartPage = () => {

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

    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        checkUser();
        fetchCart();
        fetchSaved();
    }, []);

    useEffect(() => {
        setTimeout(() => setLoadingPage(false), 1000);
    }, [loggedIn]);


    return (
        <>
            {loadingCartAndSaved && <LoadingOverlay />}
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        {loadingPage ? (
                            <h1>Loading page...</h1>
                        ) : !loggedIn ? (
                            <h1>You must log in to access your Cart.</h1>
                        ) : cartLength === 0 ? (
                            <h1>Your cart is empty</h1>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h1>
                                    {cartLength === 1
                                        ? `${cartLength} item in your Cart`
                                        : `${cartLength} items in your Cart`}
                                </h1>
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
                    <CartItem
                        key={idx}
                        productId={productId}
                        isSaved={false}
                        inCartJs={true}
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
                        {loadingPage ? (
                            <h1>Loading page...</h1>
                        ) : !loggedIn ? (
                            <h1>You must log in to access your Items Saved for Later.</h1>
                        ) : savedLength > 0 ? (
                            <>
                                <h1>Items Saved for Later</h1>
                                {
                                    savedItemsArrayId.map((arr, idx) => (
                                        <CartItem
                                            key={idx}
                                            productId={arr}
                                            isSaved={true}
                                            inCartJs={true}
                                        />
                                    ))}
                            </>
                        ) : (
                            <h1>No Items saved for later</h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CartPage;