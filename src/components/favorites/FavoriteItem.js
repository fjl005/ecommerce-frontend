import { useState, useEffect } from "react";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";
import ProductSummaryView from "../products/ProductSummaryView";
import { Container } from "reactstrap";

const FavoriteItem = ({ productId, setFavoritesLoadingOverlay }) => {

    const [favoriteItem, setFavoriteItem] = useState({});

    useEffect(() => {
        fetchFavorite();
    }, []);

    const fetchFavorite = async () => {
        try {
            const response = await axiosWithAuth.get(`/products/${productId}`);
            const data = response.data;
            setFavoriteItem(data);
        } catch (error) {
            console.log('error: ', error);
        }
    };


    return (
        <Container className='cart-container'>
            <ProductSummaryView
                productItem={favoriteItem}
                inFavoritesJs={true}
                setFavoritesLoadingOverlay={setFavoritesLoadingOverlay}
            />
        </Container>
    )
}

export default FavoriteItem