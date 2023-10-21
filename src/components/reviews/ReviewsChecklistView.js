import FiveStarGenerator from "./FiveStarGenerator";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";
import { useEffect, useState } from "react";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { Link } from 'react-router-dom';

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
            <h6 style={{ margin: '20px auto 0px auto' }}>
                By {username}, {' '}
                {formatDate(new Date(dateOfReview))}
            </h6>
            <FiveStarGenerator starRating={starRating} />
            <p>{ratingDescription}</p>

            <Link
                to={`/products/${productData._id}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    textDecoration: 'none',
                    color: 'black',
                }}
            >
                <img
                    src={productData.pictures && productData.pictures.length > 0 ? productData.pictures[0].url : fetsyEcommerceLogo}
                    alt='alt image'
                    style={{
                        width: '200px'
                    }}
                />
                <h4 style={{ marginLeft: '20px' }}>{productData.name}</h4>
            </Link>



            <div className='line-between-reviews'></div>
        </>
    )
}

export default ReviewsChecklistView