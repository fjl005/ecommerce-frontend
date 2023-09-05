import { useState, useEffect } from "react";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";
import ProductChecklistView from "../products/ProductChecklistView";
import { Container } from "reactstrap";

const FavoriteItem = ({ productId, setLoadingFavoritesPage }) => {

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
            <ProductChecklistView
                productItem={favoriteItem}
                inFavoritesJs={true}
                setLoadingFavoritesPage={setLoadingFavoritesPage}
            />
        </Container>
    )
}

export default FavoriteItem