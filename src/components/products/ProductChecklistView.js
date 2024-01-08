import { Row, Col, Button, Tooltip } from 'reactstrap';
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { Link } from 'react-router-dom';
import FiveStarGenerator from '../reviews/FiveStarGenerator';
import { useCartContext } from '../cart/CartContext';
import { useState, useEffect } from 'react';
import { axiosWithAuth } from '../miscellaneous/axiosWithAuth';
import SpinningIcon from '../miscellaneous/SpinningIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown, faPaperclip, faX, faCartPlus } from '@fortawesome/free-solid-svg-icons';


const ProductChecklistView = ({
    productItem,
    inOrderJs,
    order,
    orderId,
    inCartJs,
    isSaved,
    inFavoritesJs,
    setFavoritesLoadingOverlay,
    adminPage,
    // inReviewsJs
}) => {

    const [starRating, setStarRating] = useState(null);
    const [ratingDescription, setRatingDescription] = useState('');
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [reviewDate, setReviewDate] = useState('');
    const [downloadToolTipOpen, setDownloadToolTipOpen] = useState({});
    const downloadToolTipToggle = (productId) => {
        setDownloadToolTipOpen(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    const downloadClick = (orderId) => {
        console.log('order ID: ', orderId);
        console.log('order: ', order);
    };

    const { saveLaterCartItem, removeCartItem, moveBackToCart, removeSavedItem, fetchCart } = useCartContext();

    useEffect(() => {
        if (productItem.hasReview) {
            fetchReview(productItem._id.toString());
        }
        setLoadingProduct(false);
    }, []);

    const fetchReview = async (purchasedItemId) => {
        try {
            const response = await axiosWithAuth.get(`/reviews/${purchasedItemId}`);
            console.log('response: ', response);
            const data = response.data;
            setStarRating(data.starRating);
            setRatingDescription(data.ratingDescription);

            const date = new Date(data.reviewDate);

            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Month is 0-based, so add 1
            const day = date.getDate();

            const formattedDate = `${month}/${day}/${year}`;

            setReviewDate(formattedDate);
            setLoadingProduct(false);
        } catch (error) {
            console.log('error: ', error);
            setLoadingProduct(false);
        }
    };

    const removeFavoritesItem = async (productId) => {
        try {
            setFavoritesLoadingOverlay(true);
            const response = await axiosWithAuth.delete(`/favorites/${productId}`);
            const data = response.data;
            setFavoritesLoadingOverlay(false);
        } catch (error) {
            console.log('error in ProductChecklistView.js, removeFavoritesItem(): ', error);
            setFavoritesLoadingOverlay(false);
        }
    };

    const addCartFromFavorites = async (productId) => {
        try {
            setFavoritesLoadingOverlay(true);
            const response = await axiosWithAuth.post(`/favorites/cart/${productId}`);
            const data = response.data;
            console.log('data: ', data);
            setFavoritesLoadingOverlay(false);
            fetchCart();
        } catch (error) {
            console.log('error in ProductChecklistView.js, addCartFromFavorites(): ', error);
            setFavoritesLoadingOverlay(false);
        }
    };


    return (
        <>
            {loadingProduct ? (
                <Row>
                    <Col>
                        <SpinningIcon size='2x' />
                    </Col>
                </Row>
            ) : (
                <>
                    <Row style={{ paddingTop: '10px', marginBottom: '10px', }}>
                        <Col xs='12' sm='4' md='3'>
                            {productItem.pictures && (
                                <img
                                    src={
                                        (productItem.pictures.length > 0) ? productItem.pictures[0].url : fetsyEcommerceLogo
                                    }
                                    alt={`image for ${productItem.name}`}
                                    style={{
                                        width: '100%',
                                        marginBottom: '20px'
                                    }}
                                />
                            )}
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
                                        <FontAwesomeIcon icon={faCloudArrowDown} className='product-info-icon-align' />
                                        {productItem.productType}
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faPaperclip} className='product-info-icon-align' />
                                        1 PDF Included
                                    </p>


                                    {inOrderJs && (
                                        <>
                                            <span
                                                onMouseEnter={() => downloadToolTipToggle(productItem._id)}
                                                onMouseLeave={() => downloadToolTipToggle(productItem._id)}
                                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                                id={`downloadToolTip-${productItem._id}`}
                                                onClick={() => downloadClick(orderId)}
                                            >
                                                Click to Download
                                            </span>
                                            <Tooltip
                                                isOpen={downloadToolTipOpen[productItem._id]}
                                                target={`downloadToolTip-${productItem._id}`}
                                                toggle={() => downloadToolTipToggle(productItem._id)}
                                                placement="bottom"
                                            >
                                                Sorry, downloads are currently unavailable!
                                            </Tooltip>
                                        </>

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
                                    productItem.hasReview && starRating ? (
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
                                                {!adminPage && (
                                                    <Button>Edit Review</Button>
                                                )}
                                            </Link>
                                            <h4>Review: ({reviewDate})</h4>
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
                                            {!adminPage && (
                                                <Button>Leave a Review</Button>
                                            )}
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
                                            <FontAwesomeIcon icon={faX} className='product-info-icon-align' />
                                            Remove
                                        </span>
                                        <span
                                            className='cart-remove-save-btn'
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => moveBackToCart(productItem._id)}
                                        >
                                            <FontAwesomeIcon icon={faCartPlus} className='product-info-icon-align' />
                                            Move to Cart
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span
                                            className='cart-remove-save-btn'
                                            onClick={() => removeCartItem(productItem._id)}
                                        >
                                            <FontAwesomeIcon icon={faX} className='product-info-icon-align' />
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
                                    onClick={() => removeFavoritesItem(productItem._id)}
                                >
                                    <FontAwesomeIcon icon={faX} className='font-awesome-margin' />
                                    Remove From Favorites
                                </span>
                                <span
                                    className='cart-remove-save-btn'
                                    onClick={() => addCartFromFavorites(productItem._id)}
                                >
                                    <FontAwesomeIcon icon={faCartPlus} className='font-awesome-margin' />
                                    Add to Cart
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