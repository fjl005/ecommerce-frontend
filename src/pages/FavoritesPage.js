import { Container, Row, Col } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import { useCartContext } from "../components/cart/CartContext";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";
import { useLoginContext } from "../components/login/LoginContext";
import FavoriteItem from "../components/favorites/FavoriteItem";
import { useState, useEffect } from "react";
import LoadingOverlay from "../components/miscellaneous/LoadingOverlay";

const FavoritesPage = () => {
    const { cartLength } = useCartContext();
    const { loggedIn } = useLoginContext();

    const [favoritesData, setFavoritesData] = useState({});
    const [favoritesLength, setFavoritesLength] = useState(0);
    const [loadingFavoritesPage, setLoadingFavoritesPage] = useState(true);

    useEffect(() => {
        fetchAllFavorites();
    }, [loadingFavoritesPage]);

    const fetchAllFavorites = async () => {
        try {
            const response = await axiosWithAuth.get(`/favorites`);
            const data = response.data;
            setFavoritesData(data.favorites);
            setFavoritesLength(data.favorites.length);
            setLoadingFavoritesPage(false);
        } catch (error) {
            console.log('error: ', error);
            setLoadingFavoritesPage(false);
        }
    };


    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        {loadingFavoritesPage ? (
                            <LoadingOverlay />
                        ) : !loggedIn ? (
                            <p>You must log in to access this page.</p>
                        ) : favoritesData.length > 0 ? (
                            <>
                                <h1>
                                    {favoritesLength === 1
                                        ? `${favoritesLength} item in your Favorites`
                                        : `${favoritesLength} items in your Favorites`}
                                </h1>
                                {favoritesData.map((productId, idx) => (
                                    <FavoriteItem
                                        key={idx}
                                        productId={productId}
                                        setLoadingFavoritesPage={setLoadingFavoritesPage}
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