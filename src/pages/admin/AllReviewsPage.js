import { Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import ReviewSummaryView from "../../components/reviews/ReviewSummaryView";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";

const AllReviewsPage = () => {
    const [reviewsData, setReviewsData] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axiosWithAuth.get(`/reviews`);
            const data = response.data;
            setReviewsData(data);
        } catch (error) {
            console.log('error with fetching reviews in AllReviewsPage.js: ', error);
        }
    };

    return (
        <>
            <NavbarAdmin currentPage={NAV_TITLE_MATCH.allreviews} />
            <Container>
                <Row>
                    <Col>
                        <h1 className='h1-admin'>All Reviews</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {reviewsData.length > 0 && reviewsData.map((review, idx) => (
                            <ReviewSummaryView
                                key={idx}
                                productId={review.productId}
                                productName={review.productName}
                                imageURL={review.imageURL}
                                productType={review.productType}
                                purchasedItemId={review.purchasedItemId}
                                starRating={review.starRating}
                                ratingDescription={review.ratingDescription}
                                reviewDate={review.reviewDate}
                                username={review.username}
                                adminPage={true}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default AllReviewsPage;