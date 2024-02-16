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
        const fetchAllReviews = async () => {
            try {
                const response = await axiosWithAuth.get(`/reviews/`);
                const data = response.data;
                console.log('data: ', data);
                setReviewsData(data);
            } catch (error) {
                console.log('error fetching reviews in ReviewsInSingleProduct.js: ', error);
            } finally {
                setLoadingReviews(false);
            }
        }

        fetchAllReviews();
    }, []);

    useEffect(() => {
        calculateAvgReview();
    }, [reviewsData]);

    const calculateAvgReview = () => {
        if (reviewsData.length === 0) {
            setAverageRating(0);
        } else {
            const sumReviews = reviewsData.reduce((acc, num) => acc + num.starRating, 0);
            const roundedAvg = Math.round((sumReviews / reviewsData.length) * 10) / 10;
            setAverageRating(roundedAvg);
        }
    }

    const totalPages = Math.ceil(reviewsData.length / 5);

    const pageChangeNext = (newPageNum) => {
        setcurrentPage(newPageNum);
        setStartReviewIdx(startReviewIdx + 5);
        setEndReviewIdx(endReviewIdx + 5);
    };

    const pageChangePrev = (newPageNum) => {
        setcurrentPage(newPageNum);
        setStartReviewIdx(startReviewIdx - 5);
        setEndReviewIdx(endReviewIdx - 5);
    };

    const pageChangeMid = (newPageNum) => {
        setcurrentPage(newPageNum);
        setStartReviewIdx(newPageNum * 5 - 5);
        setEndReviewIdx(newPageNum * 5);
    };

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
    };

    const reviewNavButtons = [
        {
            // Prev button: will always decrease current page by 1, unless it's already page 1. 
            condition: totalPages > 1,
            classCriteria: currentPage === 1 && 'circle-review-nav-blocked',
            onclick: () => {
                pageChangePrev(currentPage - 1);
                if (currentPage > 2) {
                    setMidBtn(currentPage - 1);
                }
            },
            title: 'Prev',
        },
        {
            // Page 1: will always exist. When on page 1, set the mid button to 2. 
            condition: true,
            classCriteria: currentPage === 1 && 'circle-review-nav-blocked circle-review-current',
            onclick: () => {
                setPageSpecific(1);
                setMidBtn(2);
            },
            title: '1',
        },
        {
            // Left dots: when the page is beyond page 2 (the original mid button number), show the dots. 
            condition: currentPage > 2,
            classCriteria: 'circle-review-nav-blocked',
            title: '...'
        },
        {
            /*
                Mid: this button is quite dynamic.
                In the beginning, this will be defaulted to 2.
                But as you progress through the reviews, this number will continually change, so it's important to update this for all functions ('prev', 'next', '1', 'last').
            */
            condition: totalPages > 1,
            classCriteria: currentPage === midBtn && 'circle-review-nav-blocked circle-review-current',
            onclick: () => pageChangeMid(midBtn),
            title: midBtn,
        },
        {
            // Right dots: these numbers will show until you get close to the end.
            condition: midBtn + 1 < totalPages,
            classCriteria: 'circle-review-nav-blocked',
            title: '...'
        },
        {
            // Last page: opposite of page 1. When here, set the mid button to the last page minus 1. 
            condition: totalPages > 2,
            classCriteria: currentPage === totalPages && 'circle-review-nav-blocked circle-review-current',
            onclick: () => {
                setPageSpecific(totalPages);
                setMidBtn(totalPages - 1);
            },
            title: totalPages,
        },
        {
            condition: totalPages > 1,
            classCriteria: currentPage === totalPages && 'circle-review-nav-blocked',
            onclick: () => {
                pageChangeNext(currentPage + 1);
                if (currentPage + 1 < totalPages) {
                    setMidBtn(currentPage + 1);
                }
            },
            title: 'Next',
        },
    ];

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
                            reviewInfo={review}
                        />
                    ))}

                    <div className='d-flex'>
                        {reviewNavButtons.map((button, idx) => (
                            button.condition && (
                                <div
                                    key={idx}
                                    className={`circle-review-nav ${button.classCriteria}`}
                                    onClick={button.onclick}
                                >
                                    {button.title}
                                </div>
                            )
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default ReviewsInSingleProductPage;