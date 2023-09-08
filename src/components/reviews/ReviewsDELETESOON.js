import ReviewsChecklistView from "./ReviewsChecklistView";
import { reviewsData, averageRating } from "./reviewsData";
import StarReviews from "./StarReviews";
import { useState } from "react";

const Reviews = () => {
    const [currentPage, setcurrentPage] = useState(1);
    const [startReviewIdx, setStartReviewIdx] = useState(0);
    const [endReviewIdx, setEndReviewIdx] = useState(5);
    const [midBtn, setMidBtn] = useState(2);

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
            // First, check if the length is divisible by 5. If it is, then we subtract 4 and that will be our first num. 
            if (!(reviewsData.length % 5)) {
                setStartReviewIdx(Math.floor(reviewsData.length - 5));
                setEndReviewIdx(reviewsData.length);
            } else {
                // Otherwise, let's grab the lowest, closest number that's divisible by 5, plus 1. For example, if the length is 19, then we want the lowest, closest number divisible by 5 (15) then add 1 (16). But, since the number is the index, there is no need to add 1 since this is already accounted for in the array index.
                setStartReviewIdx(Math.floor(reviewsData.length / 5) * 5);
                setEndReviewIdx(reviewsData.length);
            }
        }
    }

    return (
        <>
            <h2 className='d-flex align-items-center'>Other Reviews from this shop
                <span style={{ display: 'inline-block', fontSize: '20px', margin: '0px 10px' }}> | </span>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>{averageRating}</span>
                <StarReviews rating={averageRating} />
                <span style={{ fontSize: '20px' }}>({reviewsData.length})</span>
            </h2>

            {reviewsData.slice(startReviewIdx, endReviewIdx).map((review, idx) => (
                <ReviewsChecklistView
                    key={idx}
                    starRating={review.starRating}
                    ratingDescription={review.ratingDescription}
                    productId={review.productId}
                    dateOfReview={review.dat}
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
                    <p style={{ fontSize: '25px' }}>...</p>
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
                    <p style={{ fontSize: '25px' }}>...</p>
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
                    >Next</div>
                )}

            </div>
        </>
    )
}

export default Reviews;