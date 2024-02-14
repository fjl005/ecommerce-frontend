import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from "../../components/navbar/NavbarApp";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import FavoriteItem from "../../components/favorites/FavoriteItem";
import { useState, useEffect } from "react";
import LoadingOverlay from "../../components/miscellaneous/LoadingOverlay";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";
import { useLoginContext } from "../../contexts/LoginContext";
import { useCartContext } from "../../contexts/CartContext";
import { useSavedItemContext } from "../../contexts/SavedItemContext";

const FavoritesPage = () => {
    const { loggedIn } = useLoginContext();
    const { fetchCart } = useCartContext();
    const { favoritesLoadingOverlay } = useSavedItemContext();

    const [allFavoritesID, setAllFavoritesID] = useState({});
    const [favoritesLength, setFavoritesLength] = useState(0);
    const [loadingFavoritesPage, setLoadingFavoritesPage] = useState(true);

    const fetchFavorites = async () => {
        try {
            const response = await axiosWithAuth.get(`/favorites`);
            const data = response.data;
            setAllFavoritesID(data.favorites);
            setFavoritesLength(data.favorites.length);
        } catch (error) {
            console.log('error: ', error);
        } finally {
            setLoadingFavoritesPage(false);
        }
    };

    const moveFavToCart = async () => {
        const userConfirmed = window.confirm("Are you sure you want to move all items from your Favorites to your Cart?");

        if (userConfirmed) {
            try {
                await axiosWithAuth.put(`/favorites/allToCart`);
                fetchFavorites();
                fetchCart();
            } catch (error) {
                console.log('Error: ', error);
            }
        }
    };

    const deleteAllFavs = async () => {
        const userConfirmed = window.confirm("Are you sure you want to delete all items from your Favorites?");

        if (userConfirmed) {
            try {
                console.log('deleting all items in favorites');
                await axiosWithAuth.delete(`/favorites`);
                fetchFavorites();
            } catch (error) {
                console.log('Error: ', error);
            }
        }
    };

    const buttonConfigs = [
        {
            onClick: moveFavToCart,
            text1: 'Favorites',
            text2: 'Cart',
            icon: faArrowRight,
            className: 'cart-top-button bg-primary',
        },
        {
            onClick: deleteAllFavs,
            text1: "Trash",
            icon: faTrash,
            className: 'bg-danger cart-top-button'
        },
    ];

    useEffect(() => {
        if (!favoritesLoadingOverlay) {
            fetchFavorites();
        }
    }, [favoritesLoadingOverlay]);

    return (
        <>
            {favoritesLoadingOverlay && <LoadingOverlay />}
            <NavbarApp currentPage={NAV_TITLE_MATCH.favorites} />
            <Container>
                <Row>
                    <Col>
                        {loadingFavoritesPage ? (
                            <SpinningIcon size='2x' />
                        ) : !loggedIn ? (
                            <h1>You must log in to view your Favorites.</h1>
                        ) : allFavoritesID.length > 0 ? (
                            <>
                                <div className='cart-header-buttons'>
                                    <h1>
                                        {favoritesLength === 1
                                            ? `${favoritesLength} Item in your Favorites`
                                            : `${favoritesLength} Items in your Favorites`}
                                    </h1>

                                    <div className='top-buttons-div-outer'>
                                        {buttonConfigs.map((button, idx) => (
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


                                {allFavoritesID.map((productId, idx) => (
                                    <FavoriteItem
                                        key={idx}
                                        productId={productId}
                                    />
                                ))}
                            </>
                        ) : (
                            <h1>No Favorites</h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default FavoritesPage;