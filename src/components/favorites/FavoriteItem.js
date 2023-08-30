import { useState, useEffect } from "react";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";

const FavoriteItem = ({ productId }) => {

    const [favoriteItem, setFavoriteItem] = useState({});

    useEffect(() => {
        fetchFavorite();
    }, []);

    const fetchFavorite = async () => {
        try {
            const response = await axiosWithAuth.get(`/product/${productId}`);
            const data = response.data;
            setFavoriteItem(data);
        } catch (error) {
            console.log('error: ', error);
        }
    };


    return (
        <>
            <h4>Product: {productId}</h4>
        </>
    )
}

export default FavoriteItem