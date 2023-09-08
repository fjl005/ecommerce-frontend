import FiveStarGenerator from "./FiveStarGenerator";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";
import { useEffect, useState } from "react";

const ReviewsChecklistView = ({ starRating, ratingDescription, productId, username, dateOfReview }) => {

    const [productData, setProductData] = useState({});
    console.log('date of review: ', dateOfReview)

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axiosWithAuth.get(`/products/${productId}`);
            const data = response.data;
            console.log('data: ', data);
            setProductData(data);
        } catch (error) {
            console.log('error with fetchProduct in ReviewsChecklistView.js: ', error);
        }
    }

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };


    return (
        <>
            <h3>Rating: {starRating}</h3>
            <FiveStarGenerator starRating={starRating} />
            <p>{ratingDescription}</p>
            <p>Purchased Item: {productData.name}</p>
            <p>
                By {username}, {' '}
                {formatDate(new Date(dateOfReview))}
            </p>
            <div className='line-between-reviews'></div>
        </>
    )
}

export default ReviewsChecklistView