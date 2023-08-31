import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from "reactstrap";
import NavbarApp from "../components/navbar/NavbarApp";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";
import twoPageAirbnb from '../img/twoPageAirbnb.png';
import { useLoginContext } from "../components/login/LoginContext";

const LeaveReview = () => {
    const { purchaseId } = useParams();

    const { username } = useLoginContext();

    const location = useLocation();
    const productName = location.state ? location.state.name : '';
    const productId = location.state ? location.state.productId : '';
    const orderId = location.state ? location.state.orderId : '';



    // States
    const [ratingDescription, setRatingDescription] = useState('');
    const [starRating, setstarRating] = useState(5);
    const [postSubmitMsg, setPostSubmitMsg] = useState('');

    // Star Ratings Array
    const starRatingValues = [1, 2, 3, 4, 5];


    const handleSubmit = async (event) => {
        const currentDate = new Date();

        event.preventDefault();
        console.log('submitting review');
        console.log('username: ', username);
        console.log('product name: ', productName);
        console.log('product Id: ', productId);
        console.log('star rating: ', starRating);
        console.log('ratingDescription: ', ratingDescription);
        console.log('current date: ', currentDate);
        console.log('purchaseId: ', purchaseId);

        console.log(`product website: localhost:3000/products/${productId}`);

        try {
            const response = await axiosWithAuth.post('/reviews', {
                productName,
                productId,
                starRating,
                ratingDescription,
                currentDate,
                purchaseId,
                orderId
            });

            alert('Review was submitted successfully');

        } catch (error) {
            console.log('error: when submitting review: ', error);
            if (error.response && error.response.data == 'A review by the same person for this product already exists.') {
                alert('You already left a review for this product.')
            }
        }

    };


    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Leave a Review</h1>
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

                <Row>
                    <Col>
                        Things needed for input regarding review: stars, ratingDescription,
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <h5>Overall Rating</h5>
                                <div style={{ fontSize: '30px' }}>
                                    {starRatingValues.map((value) => (
                                        value <= starRating ? (
                                            <i
                                                key={value}
                                                className="fa-solid fa-star"
                                                onClick={() => {
                                                    setstarRating(value);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            ></i>
                                        ) : (
                                            <i
                                                key={value}
                                                className="fa-regular fa-star"
                                                onClick={() => {
                                                    setstarRating(value);
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            ></i>
                                        )
                                    ))}
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label for='ratingDescription'>
                                    <h5>ratingDescription (optional)</h5>
                                </Label>
                                <Input
                                    type='textarea'
                                    id='ratingDescription'
                                    value={ratingDescription}
                                    onChange={(event) => setRatingDescription(event.target.value)}
                                />
                            </FormGroup>
                            <Button type='submit' color='primary'>Submit Review</Button>
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
}

export default LeaveReview