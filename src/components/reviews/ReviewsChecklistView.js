import FiveStarGenerator from "./FiveStarGenerator";
import { useEffect, useState } from "react";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { useProductSearchContext } from "../../contexts/ProductSearchContext";
import { formatDate } from "../miscellaneous/formatDate";


const ReviewsChecklistView = ({ reviewInfo, }) => {
    const {
        starRating,
        ratingDescription,
        productId,
        username,
        reviewDate,
        imageURL,
        productName,
    } = reviewInfo;

    const [dataExists, setDataExists] = useState(false);
    const { fetchProduct } = useProductSearchContext();

    useEffect(() => {
        fetchProduct(productId, () => null, setDataExists);
    }, []);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    color: 'black',
                    cursor: dataExists && 'pointer',
                }}
                onClick={dataExists ? () => window.location.href = `/products/${productId}` : null}
            >
                <img
                    src={imageURL ? imageURL : fetsyEcommerceLogo}
                    alt={productName}
                    style={{ width: '9rem' }}
                />
                <div className='d-flex flex-column'>
                    <h4 className='ml-3'>{productName}</h4>
                    <h6 className='red-text ml-3'>{!dataExists && 'Product has been deleted, but the review still exists!'}</h6>
                </div>
            </div>

            <h5 style={{ margin: '1.5rem auto 0 auto' }}>
                By {username}, {' '}
                {formatDate(new Date(reviewDate))}
            </h5>
            <FiveStarGenerator starRating={starRating} />
            <p>{ratingDescription}</p>
            <div className='line-between-reviews mb-4'></div>
        </>
    )
}

export default ReviewsChecklistView;