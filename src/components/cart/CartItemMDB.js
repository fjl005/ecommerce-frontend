import { Container, Row, Col } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import axios from 'axios';
import { useEffect, useState } from 'react';


const CartItemMDB = ({ removeCartItem, productId, saveLaterCartItem, isSaved, removeSavedItem, moveBackToCart, removeItem }) => {
    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const [productData, setProductData] = useState({});

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axiosWithAuth(`/products/${productId}`);
            const data = response.data;
            setProductData(data);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <Container className='cart-container'>
            <Row>
                <Col>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3>Fetsy</h3>
                        <h5>Contact Seller</h5>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginBottom: '10px' }}>
                <Col xs='3'>
                    <img
                        src={twoPageAirbnb}
                        alt={`image for ${productData.name}`}
                        style={{
                            width: '100%',
                            marginBottom: '20px'
                        }}
                    />
                </Col>
                <Col xs='6'>
                    <div className='d-flex flex-column'>
                        <h3 className='product-title'>{productData.name}</h3>
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
                                {productData.type}
                            </p>
                            <p>
                                <div className='icon-margin-align'>
                                    <i class="fa-solid fa-paperclip"></i>
                                </div>
                                1 PDF Included
                            </p>
                        </div>
                    </div>
                </Col>
                <Col xs='3' style={{ textAlign: 'right' }}>
                    {productData.price && (
                        <h3>${productData.price.toFixed(2)}</h3>
                    )}
                </Col>
            </Row>
            <Row>
                <Col style={{ marginBottom: '10px' }}>
                    {isSaved ? (
                        <>
                            <span
                                className='cart-remove-save-btn'
                                onClick={() => removeSavedItem(productId)}
                            >
                                <i class="fa-solid fa-x" style={{ marginRight: '10px' }}></i>
                                Remove
                            </span>
                            <span
                                className='cart-remove-save-btn'
                                style={{ marginLeft: '10px' }}
                                onClick={() => moveBackToCart(productId)}
                            >
                                <i class="fa-solid fa-cart-plus" style={{ marginRight: '10px' }}></i>
                                Move to Cart
                            </span>
                        </>
                    ) : (
                        <>
                            <span
                                className='cart-remove-save-btn'
                                onClick={() => removeCartItem(productId)}
                            >
                                <i class="fa-solid fa-x" style={{ marginRight: '10px' }}></i>
                                Remove
                            </span>
                            <span
                                className='cart-remove-save-btn'
                                style={{ marginLeft: '10px' }}
                                onClick={() => saveLaterCartItem(productId)}
                            >
                                Save for later
                            </span>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default CartItemMDB