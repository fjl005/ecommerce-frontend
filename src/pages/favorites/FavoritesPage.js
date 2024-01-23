import { Container, Row, Col } from "reactstrap";
import NavbarApp from "../../components/navbar/NavbarApp";
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";
import { useLoginContext } from "../../components/login/LoginContext";
import FavoriteItem from "../../components/favorites/FavoriteItem";
import { useState, useEffect } from "react";
import LoadingOverlay from "../../components/miscellaneous/LoadingOverlay";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";

const FavoritesPage = () => {
    const { loggedIn } = useLoginContext();
    const [allFavoritesID, setAllFavoritesID] = useState({});
    const [favoritesLength, setFavoritesLength] = useState(0);
    const [loadingFavoritesPage, setLoadingFavoritesPage] = useState(true);
    const [favoritesLoadingOverlay, setFavoritesLoadingOverlay] = useState(false);

    // Performed whenever an item is removed from Favorites or added to Cart.
    useEffect(() => {
        if (!favoritesLoadingOverlay) {
            // When this is set to false, the function is completed and so we can fetch all favorites. 
            fetchAllFavorites();
        }
    }, [favoritesLoadingOverlay]);


    const fetchAllFavorites = async () => {
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
                                <h1>
                                    {favoritesLength === 1
                                        ? `${favoritesLength} item in your Favorites`
                                        : `${favoritesLength} items in your Favorites`}
                                </h1>
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