import { useState, useEffect } from "react";
import { axiosWithAuth } from '../miscellaneous/axios';
import SpinningIcon from "../miscellaneous/SpinningIcon";
import FiveStarGenerator from './FiveStarGenerator';
import ReviewsChecklistView from "./ReviewsChecklistView";

const ReviewsInSingleProductPage = () => {
    const [currentPage, setcurrentPage] = useState(1);
    const [startReviewIdx, setStartReviewIdx] = useState(0);
    const [endReviewIdx, setEndReviewIdx] = useState(5);
    const [midBtn, setMidBtn] = useState(2);

    const [reviewsData, setReviewsData] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        fetchAllReviews();
    }, []);

    useEffect(() => {
        calculateAvgReview();
    }, [reviewsData]);

    const fetchAllReviews = async () => {
        try {
            const response = await axiosWithAuth.get(`/reviews/`);
            const data = response.data;
            setReviewsData(data);
            setLoadingReviews(false);
        } catch (error) {
            console.log('error fetching reviews in ReviewsInSingleProduct.js: ', error);
            setLoadingReviews(false);
        }
    }

    const calculateAvgReview = () => {
        if (reviewsData.length === 0) {
            setAverageRating(0);
        } else {
            let sumReviews = 0;
            let totalNumReviews = reviewsData.length;
            for (let review of reviewsData) {
                sumReviews += review.starRating;
            }

            const roundedAvg = Math.round((sumReviews / totalNumReviews) * 10) / 10;
            setAverageRating(roundedAvg);
        }
    }

    const totalPages = Math.ceil(reviewsData.length / 5);

    const pageChangeNext = (newPageNum) => {
        setcurrentPage(newPageNum);
        setStartReviewIdx(startReviewIdx + 5);
        setEndReviewIdx(endReviewIdx + 5);
    }

    const pageChangePrev = (newPageNum) => {
        setcurrentPage(newPageNum);
        setStartReviewIdx(startReviewIdx - 5);
        setEndReviewIdx(endReviewIdx - 5);
    }

    const pageChangeMidBtn = (newPageNum) => {
        setcurrentPage(newPageNum);
        setStartReviewIdx(newPageNum * 5 - 5);
        setEndReviewIdx(newPageNum * 5);
    }

    const setPageSpecific = (newPageNum) => {
        setcurrentPage(newPageNum);

        if (newPageNum === 1) {
            setStartReviewIdx(0);
            setEndReviewIdx(5);
        } else {
            if (!(reviewsData.length % 5)) {
                setStartReviewIdx(Math.floor(reviewsData.length - 5));
                setEndReviewIdx(reviewsData.length);
            } else {
                setStartReviewIdx(Math.floor(reviewsData.length / 5) * 5);
                setEndReviewIdx(reviewsData.length);
            }
        }
    }

    return (
        <>
            {loadingReviews ? (
                <SpinningIcon size='2x' />
            ) : reviewsData.length === 0 ? (
                <h2>No Reviews from this Shop Yet.</h2>
            ) : (
                <>
                    <h2
                        className='d-flex single-product-stars-reviews align-items-center'
                        style={{ margin: '2rem auto' }}
                    >
                        Reviews for the Shop
                        <span className='star-reviews-bracket'> | </span>
                        <div className='d-flex align-items-center'>
                            <span className='star-reviews-rating'> {averageRating} </span>
                            <FiveStarGenerator starRating={averageRating} />
                        </div>

                        <span className='star-reviews-num'> ({reviewsData.length} reviews)</span>
                    </h2>

                    {reviewsData.length > 0 && reviewsData.slice(startReviewIdx, endReviewIdx).map((review, idx) => (
                        <ReviewsChecklistView
                            key={idx}
                            starRating={review.starRating}
                            ratingDescription={review.ratingDescription}
                            productId={review.productId}
                            dateOfReview={review.reviewDate}
                            username={review.username}
                        />
                    ))}

                    <div className='d-flex'>
                        {/* Prev Button */}
                        {totalPages > 1 && (
                            <div
                                className={`circle-review-nav ${currentPage === 1 && 'circle-review-nav-blocked'}`}
                                onClick={() => {
                                    pageChangePrev(currentPage - 1);
                                    if (currentPage > 2) {
                                        setMidBtn(currentPage - 1);
                                    }
                                }}
                            >Prev</div>
                        )}


                        {/* First Page */}
                        <div
                            className={`circle-review-nav ${currentPage === 1 && 'circle-review-nav-blocked'}`}
                            onClick={() => {
                                setPageSpecific(1);
                                setMidBtn(2);
                            }}
                            style={{
                                border: currentPage === 1 ? '2px solid black' : 'none'
                            }}
                        >1</div>


                        {/* ... Part 1 */}
                        {currentPage > 2 && (
                            <p style={{ fontSize: '2rem' }}>...</p>
                        )}

                        {/* Mid Button */}
                        {totalPages > 1 && (
                            <div
                                className={`circle-review-nav ${currentPage === midBtn && 'circle-review-nav-blocked'}`}
                                onClick={() => pageChangeMidBtn(midBtn)}
                                style={{
                                    border: currentPage === midBtn ? '2px solid black' : 'none'
                                }}
                            >{midBtn}</div>
                        )}


                        {/* ... Part 2 */}
                        {midBtn + 1 < totalPages && (
                            <p style={{ fontSize: '2rem' }}>...</p>
                        )}

                        {/* Last Page */}
                        {totalPages > 2 && (
                            <div
                                className={`circle-review-nav ${currentPage === totalPages && 'circle-review-nav-blocked'}`}
                                onClick={() => {
                                    setPageSpecific(totalPages);
                                    setMidBtn(totalPages - 1);
                                }}
                                style={{
                                    border: currentPage === totalPages ? '2px solid black' : 'none'
                                }}
                            >{totalPages}</div>
                        )}


                        {/* Next Page */}
                        {totalPages > 1 && (
                            <div
                                className={`circle-review-nav ${currentPage === totalPages && 'circle-review-nav-blocked'}`}
                                onClick={() => {
                                    pageChangeNext(currentPage + 1);
                                    if (currentPage + 1 < totalPages) {
                                        setMidBtn(currentPage + 1);
                                    }
                                }}
                            >
                                Next
                            </div>
                        )}

                    </div>
                </>
            )}
        </>
    )
}

export default ReviewsInSingleProductPage;