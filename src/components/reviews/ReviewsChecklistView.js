import FiveStarGenerator from "./FiveStarGenerator";
import { useEffect, useState } from "react";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { useProductSearchContext } from "../../contexts/ProductSearchContext";
import { formatDate } from "../miscellaneous/formatDate";


const ReviewsChecklistView = ({ starRating, ratingDescription, productId, username, dateOfReview }) => {

    const [productData, setProductData] = useState({});
    const [dataExists, setDataExists] = useState(false);
    const { fetchProduct } = useProductSearchContext();

    useEffect(() => {
        fetchProduct(productId, setProductData, setDataExists);
    }, []);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    color: 'black',
                    cursor: 'pointer',
                }}
                onClick={dataExists ? (() => window.location.href = `/products/${productData._id}`) : undefined}
            >
                <img
                    src={productData.pictures && productData.pictures.length > 0 ? productData.pictures[0].url : fetsyEcommerceLogo}
                    alt={productData.name}
                    style={{ width: '9rem' }}
                />
                <h4 className='ml-3'>{productData.name}</h4>
            </div>

            <h5 style={{ margin: '1.5rem auto 0 auto' }}>
                By {username}, {' '}
                {formatDate(new Date(dateOfReview))}
            </h5>
            <FiveStarGenerator starRating={starRating} />
            <p>{ratingDescription}</p>
            <div className='line-between-reviews mb-4'></div>
        </>
    )
}

export default ReviewsChecklistView