import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import SingleReview from "../components/reviews/SingleReview";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";
import { useEffect, useState } from "react";
import { useLoginContext } from "../components/login/LoginContext";
import SpinningIcon from "../components/miscellaneous/SpinningIcon";

const ReviewsPage = () => {

    const { username, loggedIn } = useLoginContext();
    const [loadingReviewsPage, setLoadingReviewsPage] = useState(true);
    const [reviewsData, setReviewsData] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, [username]);

    const fetchReviews = async () => {
        try {
            const response = await axiosWithAuth.get(`/reviews/user/${username}`);
            const data = response.data;
            setReviewsData(data);
            setLoadingReviewsPage(false);
        } catch (error) {
            console.log('error with fetching reviews in ReviewsPage.js: ', error);
            setLoadingReviewsPage(false);
        }
    }

    return (
        <>
            <NavbarApp />
            {loadingReviewsPage ? (
                <Container>
                    <Row>
                        <Col>
                            <SpinningIcon size='2x' />
                        </Col>
                    </Row>
                </Container>
            ) : !loggedIn ? (
                <Container>
                    <Row>
                        <Col>
                            <h1>You must log in to view your Reviews.</h1>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Your Reviews</h1>
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
            )}
        </>
    )
};

export default ReviewsPage;