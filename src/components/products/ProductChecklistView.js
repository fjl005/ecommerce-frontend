import { Row, Col, Button } from 'reactstrap';
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import { Link } from 'react-router-dom';
import FiveStarGenerator from '../reviews/FiveStarGenerator';
import { useCartContext } from '../cart/CartContext';
import { useState, useEffect } from 'react';
import { axiosWithAuth } from '../miscellaneous/axiosWithAuth';

const ProductChecklistView = ({
    productItem,
    inOrderJs,
    order,
    orderId,
    inCartJs,
    isSaved,
    inFavoritesJs,
    // inReviewsJs
}) => {

    const [starRating, setStarRating] = useState(5);
    const [ratingDescription, setRatingDescription] = useState('');
    const [loadingPage, setLoadingPage] = useState(true);

    const downloadClick = (orderId) => {
        console.log('order ID: ', orderId);
        console.log('order: ', order);
    };

    const { saveLaterCartItem, removeCartItem, moveBackToCart, removeSavedItem } = useCartContext();

    console.log('product Item: ', productItem);

    useEffect(() => {
        if (productItem.hasReview) {
            fetchReview(productItem._id.toString());
        } else {
            setLoadingPage(false);
        }
    }, []);

    const fetchReview = async (purchasedItemId) => {
        try {
            const response = await axiosWithAuth.get(`/reviews/${purchasedItemId}`);
            console.log('response: ', response);
            const data = response.data;
            setStarRating(data.starRating);
            setRatingDescription(data.ratingDescription);
            setLoadingPage(false);
        } catch (error) {
            console.log('error: ', error);
            setLoadingPage(false);
        }
    }

    return (
        <>
            {loadingPage ? (
                <Row>
                    <Col>
                        <h1>Loading...</h1>
                    </Col>
                </Row>
            ) : (
                <>
                    <Row style={{ paddingTop: '10px', marginBottom: '10px', }}>
                        <Col xs='12' sm='4' md='3'>
                            <img
                                src={twoPageAirbnb}
                                alt={`image for ${productItem.name}`}
                                style={{
                                    width: '100%',
                                    marginBottom: '20px'
                                }}
                            />
                        </Col>
                        <Col xs='12' sm='8' md='6'>
                            <div className='d-flex flex-column'>
                                <h3 className='product-title'>{productItem.name}</h3>
                                <div style={{
                                    backgroundColor: 'rgb(240, 240, 240)',
                                    width: '80%',
                                    borderRadius: '10px',
                                    padding: '10px 5px 0px 5px',
                                }}>
                                    <p>
                                        <div className='icon-margin-align'>
                                            <i class="fa-solid fa-cloud-arrow-down"></i>
                                        </div>
                                        {productItem.productType}
                                    </p>
                                    <p>
                                        <div className='icon-margin-align'>
                                            <i class="fa-solid fa-paperclip"></i>
                                        </div>
                                        1 PDF Included
                                    </p>
                                    {inOrderJs && (
                                        <span
                                            onClick={() => downloadClick(orderId)}
                                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                        >
                                            Click to Download
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col sm='12' md='3' className='order-item-price-review'>
                            <div className='d-flex flex-column'>
                                {productItem.price && (
                                    <h3>${productItem.price.toFixed(2)}</h3>
                                )}

                                {inOrderJs && (
                                    productItem.hasReview ? (
                                        <>
                                            <Link
                                                to={{
                                                    pathname: `/review/edit/${productItem._id}`,
                                                }}
                                                state={{
                                                    name: productItem.name,
                                                    productId: productItem.productId,
                                                    orderId: orderId,
                                                    starRatingPrev: starRating,
                                                    ratingDescriptionPrev: ratingDescription
                                                }}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'black'
                                                }}
                                            >
                                                <Button>Edit Review</Button>
                                            </Link>
                                            <h4>Your review:</h4>
                                            <FiveStarGenerator starRating={starRating} />
                                            <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {ratingDescription ? ratingDescription : ''}
                                            </p>
                                            <p>Show Full Review (function coming soon)</p>
                                        </>
                                    ) : (
                                        <Link
                                            to={{
                                                pathname: `/review/${productItem._id}`,
                                            }}
                                            state={{
                                                name: productItem.name,
                                                productId: productItem.productId,
                                                orderId: orderId
                                            }}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black'
                                            }}
                                        >
                                            <Button>Leave a Review</Button>
                                        </Link>
                                    ))}
                            </div>
                        </Col>
                    </Row>

                    {inCartJs && (
                        <Row>
                            <Col style={{ marginBottom: '10px' }}>
                                {isSaved ? (
                                    <>
                                        <span
                                            className='cart-remove-save-btn'
                                            onClick={() => removeSavedItem(productItem._id)}
                                        >
                                            <i class="fa-solid fa-x" style={{ marginRight: '10px' }}></i>
                                            Remove
                                        </span>
                                        <span
                                            className='cart-remove-save-btn'
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => moveBackToCart(productItem._id)}
                                        >
                                            <i class="fa-solid fa-cart-plus" style={{ marginRight: '10px' }}></i>
                                            Move to Cart
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className='cart-remove-save-btn'
                                            onClick={() => removeCartItem(productItem._id)}
                                        >
                                            <i class="fa-solid fa-x" style={{ marginRight: '10px' }}></i>
                                            Remove
                                        </span>
                                        <span
                                            className='cart-remove-save-btn'
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => saveLaterCartItem(productItem._id)}
                                        >
                                            Save for later
                                        </span>
                                    </>
                                )}
                            </Col>
                        </Row>
                    )}

                    {inFavoritesJs && (
                        <Row>
                            <Col style={{ marginBottom: '10px' }}>
                                <span
                                    className='cart-remove-save-btn'
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => moveBackToCart(productItem._id)}
                                >
                                    <i class="fa-solid fa-cart-plus" style={{ marginRight: '10px' }}></i>
                                    Add to Cart
                                </span>
                                <span
                                    className='cart-remove-save-btn'
                                // onClick={() => removeFavoritesItem(productItem._id)}
                                >
                                    <i class="fa-solid fa-x" style={{ marginRight: '10px' }}></i>
                                    Remove From Favorites
                                </span>
                            </Col>
                        </Row>
                    )}
                </>
            )}
        </>
    )
};

export default ProductChecklistView