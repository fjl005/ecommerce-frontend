import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FiveStarGenerator from "../reviews/FiveStarGenerator";
import { axiosWithAuth } from "../miscellaneous/axios";
import { Button } from "reactstrap";
import SpinningIcon from "../miscellaneous/SpinningIcon";

const ReviewInSummarySection = ({ productItem, orderId, }) => {

    const hasReview = productItem.hasReview;

    const [starRating, setStarRating] = useState(null);
    const [ratingDescription, setRatingDescription] = useState('');
    const [reviewDate, setReviewDate] = useState('');
    const [loadingReview, setLoadingReview] = useState(true);


    useEffect(() => {
        if (hasReview) {
            fetchReview(productItem._id.toString());
        } else {
            setLoadingReview(false);
        }
    }, []);


    const fetchReview = async (purchasedItemId) => {
        try {
            const response = await axiosWithAuth.get(`/reviews/${purchasedItemId}`);
            const data = response.data;
            setStarRating(data.starRating);
            setRatingDescription(data.ratingDescription);

            const date = new Date(data.reviewDate);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Month is 0-based, so add 1
            const day = date.getDate();
            const formattedDate = `${month}/${day}/${year}`;

            setReviewDate(formattedDate);
            setLoadingReview(false);
            console.log('made it to loading product')
        } catch (error) {
            console.log('error: ', error);
            setLoadingReview(false);
        }
    };


    return (
        <>
            {loadingReview ? (
                <SpinningIcon size='2x' />
            ) : (
                <>
                    <Link
                        className='black-normal-text'
                        to={{ pathname: `/review/${hasReview ? 'edit/' : ''}${productItem._id}` }}
                        state={{
                            name: productItem.name,
                            productId: productItem.productId,
                            orderId: orderId,
                            ...(hasReview && {
                                starRatingPrev: starRating,
                                ratingDescriptionPrev: ratingDescription,
                            }),
                        }}
                    >
                        <Button style={{ marginBottom: '10px' }}>{hasReview ? 'Edit Review' : 'Leave a Review'}</Button>
                    </Link>

                    {hasReview && (
                        <>
                            <h4>Review: ({reviewDate})</h4>
                            <FiveStarGenerator starRating={starRating} />
                            <p className='no-overflow-text'>
                                {ratingDescription}
                            </p>
                        </>
                    )}
                </>
            )}


        </>
    )
}

export default ReviewInSummarySection