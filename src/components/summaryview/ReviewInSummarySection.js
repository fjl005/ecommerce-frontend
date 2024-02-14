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
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const formattedDate = `${month}/${day}/${year}`;

            setReviewDate(formattedDate);
            setLoadingReview(false);
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
                    {hasReview && (
                        <>
                            <h4 className='mt-3'>Review: ({reviewDate})</h4>
                            <FiveStarGenerator starRating={starRating} />
                            <p className='no-overflow-text'>
                                {ratingDescription}
                            </p>
                        </>
                    )}

                    <Link
                        className='black-text'
                        to={{ pathname: `/review/${hasReview ? 'edit/' : ''}${productItem._id}` }}
                        state={{
                            name: productItem.name,
                            productId: productItem.productId,
                            orderId,
                            ...(hasReview && {
                                starRatingPrev: starRating,
                                ratingDescriptionPrev: ratingDescription,
                            }),
                        }}
                    >
                        <Button>{hasReview ? 'Edit Review' : 'Leave a Review'}</Button>
                    </Link>
                </>
            )}


        </>
    )
}

export default ReviewInSummarySection