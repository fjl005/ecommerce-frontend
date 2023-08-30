import { Container, Row, Col } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import { useCartContext } from "../components/cart/CartContext";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";
import { useLoginContext } from "../components/login/LoginContext";
import FavoriteItem from "../components/favorites/FavoriteItem";
import { useState, useEffect } from "react";

const Favorites = () => {
    const { cartLength } = useCartContext();
    const { loggedIn } = useLoginContext();

    const [favoritesData, setFavoritesData] = useState({});
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        fetchAllFavorites();
    }, []);

    const fetchAllFavorites = async () => {
        try {
            const response = await axiosWithAuth.get(`/favorites`);
            const data = response.data;
            setFavoritesData(data.favorites);
            setLoadingPage(false);
            console.log('favorites data: ', favoritesData);
            console.log('favorites data length > 0?', favoritesData.length > 0);
        } catch (error) {
            console.log('error: ', error);
            setLoadingPage(false);
        }
    };


    return (
        <>
            <NavbarApp cartLength={cartLength} />
            <Container>
                <Row>
                    <Col>
                        <h1>Favorites</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {loadingPage ? (
                            <h3>Loading...</h3>
                        ) : !loggedIn ? (
                            <p>You must log in to access this page.</p>
                        ) : favoritesData.length > 0 ?
                            favoritesData.map((favoriteProductId, idx) => (
                                <FavoriteItem
                                    key={idx}
                                    productId={favoriteProductId}
                                />
                            ))
                            : (
                                <p>No Favorites</p>
                            )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Favorites