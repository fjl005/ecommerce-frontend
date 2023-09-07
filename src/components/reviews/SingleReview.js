import { Container, Row, Col, Button } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import FiveStarGenerator from "./FiveStarGenerator";
import { useEffect, useState } from "react";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";
import { Link } from "react-router-dom";

const SingleReview = ({ productId, purchasedItemId, starRating, ratingDescription, dateOfReview }) => {

    const [productData, setProductData] = useState({});

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            console.log('product id: ', productId);
            const response = await axiosWithAuth.get(`/products/${productId}`);
            const data = response.data;
            setProductData(data);
        } catch (error) {
            console.log('error with fetching product in SingleReview.js: ', error);
        }
    }

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <Container className='cart-container'>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <h2>{productData.name}</h2>
                </Col>
            </Row>
            <Row>
                <Col md='3'>
                    <img
                        src={twoPageAirbnb}
                        alt='alt text'
                        style={{
                            width: '100%'
                        }}
                    />
                </Col>
                <Col md='6'>
                    <h5>Review placed on: {formatDate(new Date(dateOfReview))}</h5>
                    <FiveStarGenerator starRating={starRating} />
                    <p>{ratingDescription}</p>

                </Col>
                <Col md='3'>
                    <div style={{
                        backgroundColor: 'rgb(240, 240, 240)',
                        width: '100%',
                        borderRadius: '10px',
                        padding: '15px',
                    }}>
                        <h4>Product Details</h4>

                        <p>
                            <div className='icon-margin-align'>
                                <i class="fa-solid fa-cloud-arrow-down"></i>
                            </div>
                            {productData.productType}
                        </p>
                        <p>
                            <div className='icon-margin-align'>
                                <i class="fa-solid fa-paperclip"></i>
                            </div>
                            1 PDF Included
                        </p>
                    </div>
                    <div style={{ textAlign: 'center', margin: '20px 0px' }}>
                        <Link
                            to={{
                                pathname: `/review/edit/${purchasedItemId}`,
                            }}
                            state={{
                                name: productData.name,
                                productId: productId,
                                // orderId: orderId,
                                starRatingPrev: starRating,
                                ratingDescriptionPrev: ratingDescription
                            }}
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                textAlign: 'center',
                                margin: '20px 0px'
                            }}
                        >
                            <Button>Edit Review</Button>
                        </Link>
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default SingleReview