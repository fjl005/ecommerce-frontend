import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from "../../components/navbar/NavbarApp";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import { useLoginContext } from "../../components/login/LoginContext";
import FavoriteItem from "../../components/favorites/FavoriteItem";
import { useState, useEffect } from "react";
import LoadingOverlay from "../../components/miscellaneous/LoadingOverlay";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../components/cart/CartContext";

const FavoritesPage = () => {
    const { loggedIn } = useLoginContext();
    const { fetchCart } = useCartContext();
    const [allFavoritesID, setAllFavoritesID] = useState({});
    const [favoritesLength, setFavoritesLength] = useState(0);
    const [loadingFavoritesPage, setLoadingFavoritesPage] = useState(true);
    const [favoritesLoadingOverlay, setFavoritesLoadingOverlay] = useState(false);

    // Performed whenever an item is removed from Favorites or added to Cart.
    useEffect(() => {
        if (!favoritesLoadingOverlay) {
            // When this is set to false, the function is completed and so we can fetch all favorites. 
            fetchFavorites();
        }
    }, [favoritesLoadingOverlay]);


    const fetchFavorites = async () => {
        try {
            const response = await axiosWithAuth.get(`/favorites`);
            const data = response.data;
            setAllFavoritesID(data.favorites);
            setFavoritesLength(data.favorites.length);
            setLoadingFavoritesPage(false);
        } catch (error) {
            console.log('error: ', error);
            setLoadingFavoritesPage(false);
        }
    };

    const moveFavToCart = async () => {
        const userConfirmed = window.confirm("Are you sure you want to move all items from your Favorites to your Cart?");

        if (userConfirmed) {
            try {
                console.log('moving all items in favorites to cart');
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



    return (
        <>
            {favoritesLoadingOverlay && <LoadingOverlay />}
            <NavbarApp currentPage='Favorites' />
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

                                    <div className='outer-buttons-div'>
                                        <Button
                                            onClick={() => moveFavToCart()}
                                            className='cart-top-button bg-primary'
                                        >
                                            Favorites
                                            <FontAwesomeIcon
                                                icon={faArrowRight}
                                                className='cart-font-awesome'
                                            />
                                            Cart
                                        </Button>

                                        <Button
                                            onClick={() => deleteAllFavs()}
                                            className='bg-danger cart-top-button'
                                        >
                                            <FontAwesomeIcon icon={faTrash}
                                                className='cart-font-awesome'
                                            />
                                            Favorites
                                        </Button>
                                    </div>
                                </div>


                                {allFavoritesID.map((productId, idx) => (
                                    <FavoriteItem
                                        key={idx}
                                        productId={productId}
                                        setFavoritesLoadingOverlay={setFavoritesLoadingOverlay}
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