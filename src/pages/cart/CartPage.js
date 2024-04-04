import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItem from "../../components/cart/CartItem";
import { Link } from "react-router-dom";
import LoadingOverlay from "../../components/miscellaneous/LoadingOverlay";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import { useCartContext } from "../../contexts/CartContext";
import { useLoginContext } from '../../contexts/LoginContext';
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrash, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { useSavedItemContext } from "../../contexts/SavedItemContext";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";

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
        setLoadingPage(false);
    }, []);

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

    const buttonConfigs = [
        {
            onClick: moveAllToSaved,
            text1: "Cart",
            text2: "Saved",
            icon: faArrowRight,
            className: "bg-primary"
        },
        {
            onClick: moveAllToFavorites,
            text1: "Cart",
            text2: "Favorites",
            icon: faArrowRight,
            className: "bg-primary"
        },
        {
            onClick: deleteAllCart,
            text1: "Cart",
            icon: faTrash,
            className: "bg-danger"
        },
        {
            onClick: deleteAllSaved,
            text1: 'Saved',
            icon: faTrash,
            className: 'bg-danger',
        },
        {
            onclick: moveAllToCart,
            text1: 'Saved',
            text2: 'Cart',
            icon: faArrowRight,
            className: 'bg-primary',
        },
    ];


    return (
        <>
            {loadingCartAndSaved && <LoadingOverlay />}
            <NavbarApp currentPage={NAV_TITLE_MATCH.cart} />
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

                                <div className='top-buttons-div-outer'>
                                    {buttonConfigs.slice(0, 3).map((button, idx) => (
                                        <Button
                                            key={idx}
                                            onClick={button.onClick}
                                            className={`cart-top-button ${button.className}`}
                                        >
                                            {button.text1}
                                            <FontAwesomeIcon icon={button.icon} className='cart-font-awesome' />
                                            <span className='cart-font-awesome'>{button.text2}</span>
                                        </Button>
                                    ))}

                                    <Link
                                        to={{ pathname: `/cart/checkout` }}
                                        className='black-text'
                                    >
                                        <Button
                                            className='bg-success cart-top-button'
                                        >
                                            Checkout
                                            <FontAwesomeIcon
                                                icon={faMoneyCheckDollar}
                                                className='cart-font-awesome'
                                            />
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

            <Container style={{ marginTop: '5rem' }}>
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
                                    <div className='top-buttons-div-outer'>
                                        {buttonConfigs.slice(3).map((button, idx) => (
                                            <Button
                                                key={idx}
                                                onClick={button.onClick}
                                                className={`cart-top-button ${button.className}`}
                                            >
                                                {button.text1}
                                                <FontAwesomeIcon icon={button.icon} className='cart-font-awesome' />
                                                <span className='cart-font-awesome'>{button.text2}</span>
                                            </Button>
                                        ))}
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