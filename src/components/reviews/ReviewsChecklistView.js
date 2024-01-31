import FiveStarGenerator from "./FiveStarGenerator";
import { axiosWithAuth } from "../miscellaneous/axios";
import { useEffect, useState } from "react";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';


const ReviewsChecklistView = ({ starRating, ratingDescription, productId, username, dateOfReview }) => {

    const [productData, setProductData] = useState({});
    console.log('accessing reviews checklist view');

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axiosWithAuth.get(`/products/${productId}`);
            const data = response.data;
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

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    color: 'black',
                    cursor: 'pointer',
                }}
                onClick={() => window.location.href = `/products/${productData._id}`}
            >
                <img
                    src={productData.pictures && productData.pictures.length > 0 ? productData.pictures[0].url : fetsyEcommerceLogo}
                    alt='alt image'
                    style={{
                        width: '200px'
                    }}
                />
                <h4 style={{ marginLeft: '20px' }}>{productData.name}</h4>
            </div>

            <div className='line-between-reviews'></div>
        </>
    )
}

export default ReviewsChecklistView