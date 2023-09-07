import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import SingleReview from "../components/reviews/SingleReview";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";
import { useEffect, useState } from "react";
import { useLoginContext } from "../components/login/LoginContext";

const ReviewsPage = () => {

    const { username } = useLoginContext();
    const [reviewsData, setReviewsData] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, [username]);

    const fetchReviews = async () => {
        try {
            console.log('username: ', username);
            const response = await axiosWithAuth.get(`/reviews/user/${username}`);
            const data = response.data;
            setReviewsData(data);
            console.log('reviews data: ', reviewsData);
        } catch (error) {
            console.log('error with fetching reviews in ReviewsPage.js: ', error);
        }
    }

    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Reviews</h1>
                    </Col>
                </Row>
            </Container>

            {reviewsData.length > 0 && reviewsData.map((review, idx) => (
                <SingleReview
                    key={idx}
                    productId={review.productId}
                    purchasedItemId={review.purchasedItemId}
                    starRating={review.starRating}
                    ratingDescription={review.ratingDescription}
                    dateOfReview={review.currentDate}
                />
            ))}
        </>
    )
};

export default ReviewsPage;