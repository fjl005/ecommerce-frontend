import { Container, Row, Col } from "reactstrap";
import NavbarApp from "../../components/navbar/NavbarApp";
import SingleReviewInReviewsPage from "../../components/reviews/SingleReviewInReviewsPage";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import { useEffect, useState } from "react";
import { useLoginContext } from "../../contexts/LoginContext";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";

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
        } catch (error) {
            console.log('error with fetching reviews in ReviewsPage.js: ', error);
        } finally {
            setLoadingReviewsPage(false);
        }
    };

    return (
        <>
            <NavbarApp currentPage={NAV_TITLE_MATCH.reviews} />
            <Container>
                <Row>
                    <Col>
                        {loadingReviewsPage ? (
                            <SpinningIcon size='2x' />
                        ) : !loggedIn ? (
                            <h1>You must log in to view your Reviews.</h1>
                        ) : reviewsData.length > 0 ? (
                            <>
                                <h1>Your Reviews</h1>
                                {reviewsData.map((review, idx) => (
                                    <SingleReviewInReviewsPage
                                        key={idx}
                                        productId={review.productId}
                                        productName={review.productName}
                                        imageURL={review.imageURL}
                                        productType={review.productType}
                                        purchasedItemId={review.purchasedItemId}
                                        starRating={review.starRating}
                                        ratingDescription={review.ratingDescription}
                                        reviewDate={review.reviewDate}
                                    />
                                ))}
                            </>
                        ) : (
                            <h1>No Reviews</h1>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default ReviewsPage;