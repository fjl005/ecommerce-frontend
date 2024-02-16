import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import NavbarApp from "../../components/navbar/NavbarApp";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import FiveStarGenerator from "../../components/reviews/FiveStarGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";
import { useLoginContext } from "../../contexts/LoginContext";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";

const LeaveReviewPage = () => {
    const { purchasedItemId } = useParams();
    const { username } = useLoginContext();

    const location = useLocation();
    const productName = location.state ? location.state.productName : '';
    const productId = location.state ? location.state.productId : '';
    const imageURL = location.state ? location.state.imageURL : '';
    const productType = location.state ? location.state.productType : '';
    const orderId = location.state ? location.state.orderId : '';
    const starRatingPrev = location.state ? location.state.starRatingPrev : '';
    const ratingDescriptionPrev = location.state ? location.state.ratingDescriptionPrev : '';

    const [ratingDescription, setRatingDescription] = useState('');
    const [reviewData, setReviewData] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [starRating, setStarRating] = useState(5);

    useEffect(() => {
        if (productName) {
            setReviewData({
                productName,
                productId,
                imageURL,
                productType,
                starRatingPrev,
                ratingDescriptionPrev,
                orderId
            });

            setLoadingData(false);
        }

        else {
            const fetchReview = async () => {
                try {
                    const response = await axiosWithAuth.get(`/reviews/user/${username}`);
                    const data = response.data;
                    const specificReview = data.filter(review => review.purchasedItemId === purchasedItemId);
                    if (specificReview.length === 1) {
                        setReviewData({
                            productName: specificReview[0].productName,
                            productId: specificReview[0].productId,
                            imageURL: specificReview[0].imageURL,
                            productType: specificReview[0].productType,
                            starRatingPrev: specificReview[0].starRating,
                            ratingDescriptionPrev: specificReview[0].ratingDescription,
                            orderId: specificReview[0].orderIdString,
                        });
                    } else {
                        console.log('review not found');
                    }
                } catch (error) {
                    console.log('error: ', error);
                } finally {
                    setLoadingData(false);
                }
            }

            fetchReview();
            // Fetch Product - in case there was an issue with Link state.
        }
        setRatingDescription(ratingDescriptionPrev);
    }, [username]);

    const isEditRoute = location.pathname.includes('/edit/');


    const handleSubmit = async (event) => {
        const reviewDate = new Date();

        event.preventDefault();
        try {
            await axiosWithAuth.post('/reviews', {
                productName,
                productId,
                imageURL,
                productType,
                starRating,
                ratingDescription,
                reviewDate,
                purchasedItemId,
                orderId
            });

            if (isEditRoute) {
                alert('Review was modified successfully');
            } else {
                alert('Review was submitted successfully');
            }

            window.location.href = '/orders';
        } catch (error) {
            console.log('error: when submitting review: ', error);
            if (error.response && error.response.data == 'A review by the same person for this product already exists.') {
                alert('You already left a review for this product.')
            } else {
                alert('Sorry, there was an error in uploading your review.');
            }
        }
    };

    const deleteReview = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this review?');

        if (confirmed) {
            try {
                console.log('order id: ', orderId);
                await axiosWithAuth.delete(`/reviews/${purchasedItemId}`);
                alert('Review was deleted successfully');
                window.location.href = '/orders';
            } catch (error) {
                console.log('error: when deleting review: ', error);
                alert('Sorry, there was an error in deleting your review');
            }
        }
    }


    return (
        <>
            <NavbarApp currentPage={NAV_TITLE_MATCH.reviews} />
            <Container>
                <Row>
                    <Col>
                        {isEditRoute ? (
                            <h1>Edit Your Review</h1>
                        ) : (
                            <h1>Leave a Review</h1>
                        )}
                    </Col>
                </Row>

                {loadingData ? (
                    <Row>
                        <Col>
                            <SpinningIcon size='2x' />
                        </Col>
                    </Row>
                ) : (
                    <>
                        <Row>
                            <Col>
                                <h3>for {reviewData.productName}</h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div className='text-center'>
                                    <img
                                        src={reviewData.imageURL ? reviewData.imageURL : fetsyEcommerceLogo}
                                        alt={`image for ${reviewData.productName}`}
                                        style={{ width: '45%' }}
                                    />

                                </div>
                            </Col>
                        </Row>

                        {isEditRoute && (
                            <>
                                <Row>
                                    <Col>
                                        <h3>Original Review:</h3>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <FiveStarGenerator starRating={reviewData.starRatingPrev} />
                                        {reviewData.ratingDescriptionPrev && (
                                            <p>{reviewData.ratingDescriptionPrev}</p>
                                        )}
                                        <hr className='purple-line-break' />

                                    </Col>
                                </Row>


                                <Row>
                                    <Col>
                                        <h3>Enter Updated Review Below:</h3>
                                    </Col>
                                </Row>
                            </>
                        )}

                        <Row>
                            <Col>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <h5>Overall Rating</h5>
                                        <FiveStarGenerator
                                            starRating={starRating}
                                            editRating={true}
                                            setStarRating={setStarRating}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor='ratingDescription'>
                                            <h5>Description (optional)</h5>
                                        </Label>
                                        <Input
                                            type='textarea'
                                            id='ratingDescription'
                                            value={ratingDescription}
                                            onChange={(event) => setRatingDescription(event.target.value)}
                                        />
                                    </FormGroup>
                                    {isEditRoute ? (
                                        <>
                                            <Button type='submit' color='primary'>
                                                Edit Review
                                            </Button>

                                            <Button
                                                onClick={() => deleteReview()}
                                                className='bg-danger ml-3 btn-border-none'
                                            >
                                                <FontAwesomeIcon icon={faTrash} /> Review
                                            </Button>
                                        </>
                                    ) : (
                                        <Button type='submit' color='primary' className='btn-border-none'>
                                            Submit Review
                                        </Button>
                                    )}
                                </Form>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </>
    )
};

export default LeaveReviewPage;