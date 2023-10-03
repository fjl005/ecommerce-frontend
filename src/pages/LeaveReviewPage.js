import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";
import twoPageAirbnb from '../img/twoPageAirbnb.png';
import { useLoginContext } from "../components/login/LoginContext";
import FiveStarGenerator from "../components/reviews/FiveStarGenerator";

const LeaveReviewPage = () => {
    const { purchasedItemId } = useParams();
    const { username } = useLoginContext();

    const location = useLocation();
    const productName = location.state ? location.state.name : '';
    const productId = location.state ? location.state.productId : '';
    const starRatingPrev = location.state ? location.state.starRatingPrev : '';
    const ratingDescriptionPrev = location.state ? location.state.ratingDescriptionPrev : '';
    const orderId = location.state ? location.state.orderId : '';

    const isEditRoute = location.pathname.includes('/edit/');

    // States
    const [ratingDescription, setRatingDescription] = useState('');
    const [starRating, setStarRating] = useState(5);
    const [postSubmitMsg, setPostSubmitMsg] = useState('');


    const handleSubmit = async (event) => {
        const currentDate = new Date();

        event.preventDefault();
        if (isEditRoute) {
            try {
                const response = await axiosWithAuth.post('/reviews', {
                    productName,
                    productId,
                    starRating,
                    ratingDescription,
                    currentDate,
                    purchasedItemId,
                    orderId
                });

                alert('Review was modified successfully');
                window.location.href = '/reviews';

            } catch (error) {
                console.log('error: when editing review: ', error);
            }

        } else {
            try {
                const response = await axiosWithAuth.post('/reviews', {
                    productName,
                    productId,
                    starRating,
                    ratingDescription,
                    currentDate,
                    purchasedItemId,
                    orderId
                });

                alert('Review was submitted successfully');
                window.location.href = '/reviews';

            } catch (error) {
                console.log('error: when submitting review: ', error);
                if (error.response && error.response.data == 'A review by the same person for this product already exists.') {
                    alert('You already left a review for this product.')
                }
            }
        }
    };

    const deleteReview = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this review?');

        if (confirmed) {
            try {
                console.log('order id: ', orderId);
                const response = await axiosWithAuth.delete(`/reviews/${purchasedItemId}`);
                alert('Review was deleted successfully');
                window.location.href = '/reviews';
            } catch (error) {
                console.log('error: when deleting review: ', error);
            }
        } else {
            // User clicked cancel in the confirmation dialog
            console.log('Review deletion cancelled.');
        }
    }


    return (
        <>
            <NavbarApp />
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

                <Row>
                    <Col>
                        <h3>for {productName}</h3>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div style={{
                            margin: '0 auto',
                            width: '50%'
                        }}>
                            <img
                                src={twoPageAirbnb}
                                alt={`image for ${productName}`}
                                style={{
                                    width: '100%',
                                }}
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
                                <FiveStarGenerator starRating={starRatingPrev} />
                                {ratingDescriptionPrev ? (
                                    <p>{ratingDescriptionPrev}</p>
                                ) : (
                                    <p>No Description.</p>
                                )}
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
                                <Label for='ratingDescription'>
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
                                    <Button type='submit' color='primary'>Edit Review</Button>
                                    <Button onClick={() => deleteReview()} style={{ marginLeft: '20px' }}>Delete Review</Button>
                                </>
                            ) : (
                                <Button type='submit' color='primary'>Submit Review</Button>
                            )}
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {postSubmitMsg}
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default LeaveReviewPage;