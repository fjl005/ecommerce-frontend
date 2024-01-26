import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";
import LoadingOverlay from "../../components/miscellaneous/LoadingOverlay";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import { useCartContext } from "../../components/cart/CartContext";
import { useLoginContext } from '../../components/login/LoginContext';
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrash, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { useSavedItemContext } from "../../components/cart/SavedItemContext";

const CartPage = () => {

    const {
        fetchSaved,
        savedItemsArrayId,
        savedLength,
    } = useSavedItemContext();

    const {
        fetchCart,
        cartItemsArrayId,
        cartLength,
        totalCost,
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

    // Just not using arrow function for funsies.
    async function deleteAllCart() {
        const userConfirmed = window.confirm("Are you sure you want to delete all items from your Cart?");

        if (userConfirmed) {
            try {
                await axiosWithAuth.delete('/cart');
                fetchCart();
            } catch (error) {
                console.log('Error in deleteAllCart() in CartPage.js: ', error);
                alert('There was an error in deleting all items in your Cart.');
            }
        }
    }

    const deleteAllSaved = async () => {
        const userConfirmed = window.confirm("Are you sure you want to delete all items from your Saved?");

        if (userConfirmed) {
            try {
                await axiosWithAuth.delete('/cart/all/saved');
                fetchSaved();
            } catch (error) {
                console.log('Error in deleteAllSaved() in CartPage.js: ', error);
                alert('There was an error in deleting all items in your Saved.');
            }
        }
    };

    const moveAllToCart = async () => {
        const userConfirmed = window.confirm("Are you sure you want to move all Saved Items to your Cart?");

        if (userConfirmed) {
            try {
                await axiosWithAuth.post('/cart/all/tocart');
                fetchCart();
                fetchSaved();
            } catch (error) {
                console.log('Error in moveAllToCart() in CartPage.js: ', error);
                alert('There was an error in moving all Saved items to your Cart.');
            }
        }
    };

    const moveAllToSaved = async () => {
        const userConfirmed = window.confirm("Are you sure you want to move all Cart Items to your Saved?");

        if (userConfirmed) {
            try {
                await axiosWithAuth.post('/cart/all/tosaved');
                fetchCart();
                fetchSaved();
            } catch (error) {
                console.log('Error in moveAllToSaved() in CartPage.js: ', error);
                alert('There was an error in moving all Cart items to your Saved.');
            }
        }
    };

    const moveAllToFavorites = async () => {
        const userConfirmed = window.confirm("Are you sure you want to move all Cart Items to your Favorites?");

        if (userConfirmed) {
            try {
                await axiosWithAuth.put('/cart/allToFav');
                fetchCart();
                fetchSaved();
            } catch (error) {
                console.log('Error in moveAllToSaved() in CartPage.js: ', error);
                alert('There was an error in moving all Cart items to your Favorites.');
            }
        }
    };


    return (
        <>
            {loadingCartAndSaved && <LoadingOverlay />}
            <NavbarApp currentPage='Cart' />
            <Container>
                <Row>
                    <Col>
                        {loadingPage ? (
                            <SpinningIcon size='2x' />
                        ) : !loggedIn ? (
                            <h1>You must log in to access your Cart.</h1>
                        ) : cartLength === 0 ? (
                            <h1 className='text-center'>Your Cart is Empty</h1>
                        ) : (
                            <div className='cart-header-buttons'>
                                <h1>
                                    {cartLength === 1
                                        ? `${cartLength} Item in your Cart`
                                        : `${cartLength} Items in your Cart`}
                                </h1>

                                <div className='outer-buttons-div'>
                                    <Button
                                        onClick={() => moveAllToSaved()}
                                        className='cart-top-button bg-primary'
                                    >
                                        Cart
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className='cart-font-awesome'
                                        />
                                        Saved
                                    </Button>

                                    <Button
                                        onClick={() => moveAllToFavorites()}
                                        className='cart-top-button bg-primary'
                                    >
                                        Cart
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                            className='cart-font-awesome'
                                        />
                                        Favorites
                                    </Button>

                                    <Button
                                        onClick={() => deleteAllCart()}
                                        className='bg-danger cart-top-button'
                                    >
                                        <FontAwesomeIcon icon={faTrash}
                                            className='cart-font-awesome'
                                        />
                                        Cart
                                    </Button>

                                    <Link
                                        to={{ pathname: `/cart/checkout` }}
                                        className='black-normal-text'
                                    >
                                        <Button
                                            className='bg-success cart-top-button'
                                        >
                                            <FontAwesomeIcon
                                                icon={faMoneyCheckDollar}
                                                className='cart-font-awesome'
                                            />
                                            Checkout
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>

            {cartLength > 0 && cartItemsArrayId && cartItemsArrayId.map((productId, idx) => (
                <CartItem
                    key={idx}
                    productId={productId}
                    isSaved={false}
                    inCartJs={true}
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
                        {loadingPage ? (
                            <SpinningIcon size='2x' />
                        ) : !loggedIn ? (
                            <h1>You must log in to access your Items Saved for Later.</h1>
                        ) : savedLength > 0 ? (
                            <>
                                <div className='cart-header-buttons'>
                                    <h1>
                                        {savedLength === 1
                                            ? `${savedLength} Item Saved for Later`
                                            : `${savedLength} Items Saved for Later`}
                                    </h1>
                                    <div className='outer-buttons-div'>
                                        <Button
                                            onClick={() => deleteAllSaved()}
                                            className='bg-danger cart-top-button'
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                className='cart-font-awesome'
                                            />
                                            Saved
                                        </Button>
                                        <Button
                                            className='cart-top-button'
                                            onClick={() => moveAllToCart()}
                                        >
                                            Saved
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className='cart-font-awesome'
                                            />
                                            Cart
                                        </Button>
                                    </div>

                                </div>
                                {savedItemsArrayId.map((arr, idx) => (
                                    <CartItem
                                        key={idx}
                                        productId={arr}
                                        isSaved={true}
                                        inCartJs={true}
                                    />
                                ))}
                            </>
                        ) : (
                            <h1 className='text-center'>No Items saved for later</h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CartPage;