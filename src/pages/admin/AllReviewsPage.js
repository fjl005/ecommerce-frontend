import { Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import SingleReview from "../../components/reviews/SingleReview";

const AllReviewsPage = () => {
    const [loadingReviewsPage, setLoadingReviewsPage] = useState(true);
    const [reviewsData, setReviewsData] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axiosWithAuth.get(`/reviews`);
            const data = response.data;
            console.log('data: ', data);
            setReviewsData(data);
            setLoadingReviewsPage(false);
        } catch (error) {
            console.log('error with fetching reviews in AllReviewsPage.js: ', error);
            setLoadingReviewsPage(false);
        }
    };

    return (
        <>
            <NavbarAdmin />
            <Container>
                <Row>
                    <Col>
                        <h1 className='h1-admin'>All Reviews</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {reviewsData.length > 0 && reviewsData.map((review, idx) => (
                            <SingleReview
                                key={idx}
                                productId={review.productId}
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
}

export default AllReviewsPage;