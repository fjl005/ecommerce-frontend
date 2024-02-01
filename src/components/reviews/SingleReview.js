import { Container, Row, Col, Button } from "reactstrap";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import FiveStarGenerator from "./FiveStarGenerator";
import { useEffect, useState } from "react";
import { axiosWithAuth } from "../miscellaneous/axios";
import { Link } from "react-router-dom";
import SpinningIcon from "../miscellaneous/SpinningIcon";
import { formatDate } from "../miscellaneous/formatDate";
import ProductTypeIcons from "../products/ProductTypeIcons";

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
                            <div className='d-flex'>
                                <img
                                    src={
                                        productData.pictures && productData.pictures.length > 0
                                            ? productData.pictures[0].url
                                            : fetsyEcommerceLogo}
                                    alt={productData.name}
                                    className='mx-auto'
                                    style={{ width: '70%' }}
                                />
                            </div>

                        </Col>

                        <Col sm='12' md='6'>
                            <h4>Review placed on: {formatDate(new Date(reviewDate))}</h4>
                            <FiveStarGenerator starRating={starRating} />
                            <p>{ratingDescription}</p>
                        </Col>

                        <Col sm='12' md='3'>
                            <div className='product-gray-background'>
                                <h4>Product Details</h4>
                                <ProductTypeIcons productType={productData.productType} />
                            </div>
                            <div className='text-center' style={{ margin: '1.5rem 0 0.5rem 0' }}>
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