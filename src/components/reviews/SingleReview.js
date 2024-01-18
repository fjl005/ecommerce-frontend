import { Container, Row, Col, Button } from "reactstrap";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import FiveStarGenerator from "./FiveStarGenerator";
import { useEffect, useState } from "react";
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";
import { Link } from "react-router-dom";
import SpinningIcon from "../miscellaneous/SpinningIcon";
import { formatDate } from "../miscellaneous/formatDate";
import DigitalProduct from "../products/DigitalProduct";

const SingleReview = ({
    productId,
    purchasedItemId,
    starRating,
    ratingDescription,
    reviewDate,
    username,
    adminPage
}) => {

    const [productData, setProductData] = useState({});
    const [loadingReview, setLoadingReview] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axiosWithAuth.get(`/products/${productId}`);
            const data = response.data;
            setProductData(data);
            setLoadingReview(false);
        } catch (error) {
            console.log('error with fetching product in SingleReview.js: ', error);
            setLoadingReview(false);
        }
    };


    return (
        <Container className='cart-container'>
            {loadingReview ? (
                <Row>
                    <Col>
                        <SpinningIcon size='2x' />
                    </Col>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col className='text-center'>
                            <h2>{productData.name}</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm='12' md='3'>
                            <img
                                src={
                                    productData.pictures && productData.pictures.length > 0
                                        ? productData.pictures[0].url
                                        : fetsyEcommerceLogo}
                                alt={`image for ${productData.name}`}
                                style={{ width: '100%' }}
                            />
                        </Col>

                        <Col sm='12' md='6'>
                            <h4>
                                Review placed on: {formatDate(new Date(reviewDate))}
                            </h4>

                            <FiveStarGenerator starRating={starRating} />
                            <p>{ratingDescription}</p>
                        </Col>

                        <Col sm='12' md='3'>
                            <div className='product-gray-background'>
                                <h4>Product Details</h4>
                                {productData.productType === 'Digital Download' && (
                                    <DigitalProduct />
                                )}
                            </div>
                            <div style={{ textAlign: 'center', margin: '20px 0px' }}>
                                {!adminPage && (
                                    <Link
                                        className='black-normal-text'
                                        to={{ pathname: `/review/edit/${purchasedItemId}` }}
                                        state={{
                                            name: productData.name,
                                            productId: productId,
                                            starRatingPrev: starRating,
                                            ratingDescriptionPrev: ratingDescription
                                        }}
                                    >
                                        <Button>Edit Review</Button>
                                    </Link>
                                )}
                            </div>

                            {username && (
                                <div className='no-overflow-text'>
                                    <h5>Purchased by {username}</h5>
                                </div>
                            )}
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}

export default SingleReview