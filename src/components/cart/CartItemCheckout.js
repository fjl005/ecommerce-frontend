import { Container, Row, Col } from "reactstrap";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import axios from 'axios';
import { useEffect, useState } from 'react';


const CartItemCheckout = ({ productId }) => {
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
            <Row style={{ paddingTop: '15px' }}>
                <Col xs='2'>
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
                                {productData.productType}
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
                <Col xs='4' style={{ textAlign: 'right' }}>
                    <h3>${productData.price && productData.price.toFixed(2)}</h3>
                </Col>
            </Row>
        </Container>
    )
}

export default CartItemCheckout;