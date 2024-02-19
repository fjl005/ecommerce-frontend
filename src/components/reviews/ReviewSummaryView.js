import { Container, Row, Col, Button } from "reactstrap";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import FiveStarGenerator from "./FiveStarGenerator";
import { Link } from "react-router-dom";
import { formatDate } from "../miscellaneous/formatDate";
import ProductTypeIcons from "../products/ProductTypeIcons";
import { useProductSearchContext } from "../../contexts/ProductSearchContext";
import { useEffect, useState } from "react";

const ReviewSummaryView = ({
    productId,
    purchasedItemId,
    starRating,
    ratingDescription,
    reviewDate,
    username,
    adminPage,
    productName,
    imageURL,
    productType,
}) => {
    const { fetchProduct } = useProductSearchContext();

    const [dataExists, setDataExists] = useState(false);

    useEffect(() => {
        fetchProduct(productId, () => null, setDataExists);
    })


    return (
        <Container className='cart-container'>
            <Row>
                <Col className='text-center mt-3'>
                    {dataExists ? (
                        <Link to={`/products/${productId}`} className='black-text'>
                            <h2>{productName}</h2>
                        </Link>
                    ) : (
                        <>
                            <h2>{productName}</h2>
                            <h6 className='red-text'>Product has been deleted, but the review can still be updated!</h6>
                        </>
                    )}
                </Col>
            </Row>

            <Row>
                <Col sm='12' md='3'>
                    <div className='d-flex'>
                        <img
                            src={imageURL ? imageURL : fetsyEcommerceLogo}
                            alt={productName}
                            className='mx-auto w-70'
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
                        <ProductTypeIcons props={productType} />
                    </div>
                    <div className='text-center' style={{ margin: '1.5rem 0 0.5rem 0' }}>
                        {!adminPage && (
                            <Link
                                className='black-text'
                                to={{ pathname: `/review/edit/${purchasedItemId}` }}
                                state={{
                                    productName,
                                    imageURL,
                                    productType,
                                    productId,
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
        </Container>
    )
}

export default ReviewSummaryView;