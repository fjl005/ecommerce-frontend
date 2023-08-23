import NavbarApp from "../components/miscellaneous/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import { useState, useEffect } from "react";
import twoPageAirbnb from '../img/twoPageAirbnb.png';
import { useLocation } from "react-router-dom";
import { useCartContext } from "../components/cart/CartContext";


const Orders = () => {
    const location = useLocation();
    const { cartLength } = useCartContext();

    const axiosWithAuth = axios.create({
        baseURL: 'http://localhost:5000/',
        withCredentials: true,
    });

    const [ordersID, setOrdersID] = useState([]);
    const [ordersData, setOrdersData] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetchOrdersID();
    }, [location.pathname]);

    useEffect(() => {
        fetchOrdersData();
    }, [ordersID])

    const fetchOrdersID = async () => {
        try {
            const response = await axiosWithAuth.get('/orders');
            setLoggedIn(true);
            const data = response.data;
            if (data) {
                setOrdersID(data);
                setLoadingPage(false);
            }
        } catch (error) {
            if (error.response.data == "You must log in before accessing this page") {
                setLoadingPage(false);
                setLoggedIn(false);
            }
            console.log('error: ', error);
        }
    }

    const fetchOrdersData = async () => {
        try {
            const updatedOrdersData = [];
            console.log('orders ID: ', ordersID)
            for (const productID of ordersID) {
                console.log('productID: ', productID);
                const response = await axiosWithAuth.get(`/products/${productID}`);
                const data = response.data;
                updatedOrdersData.push(data);
            }
            console.log('updated orders data: ', updatedOrdersData);
            setOrdersData(updatedOrdersData);
            console.log('orders data: ', ordersData);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const downloadClick = (order) => {
        console.log('order from click: ', order);
    }


    return (
        <>
            <NavbarApp cartLength={cartLength} />
            <Container>
                <Row>
                    <Col>
                        <h1>View Your Orders</h1>
                    </Col>
                </Row>
            </Container>

            {loadingPage ? (
                <Container>
                    <Row>
                        <Col>
                            <h3>Loading...</h3>
                        </Col>
                    </Row>
                </Container>
            ) : !loggedIn ? (
                <Container>
                    <Row>
                        <Col>
                            <h3>You must log in to see your orders.</h3>
                        </Col>
                    </Row>
                </Container>
            ) :
                ordersData ?
                    ordersData.map((order, idx) => (
                        <Container className='cart-container' key={idx}>
                            <Row style={{ marginBottom: '10px' }}>
                                <Col xs='3'>
                                    <img
                                        src={twoPageAirbnb}
                                        alt={`image for ${order.name}`}
                                        style={{
                                            width: '100%',
                                            marginBottom: '20px'
                                        }}
                                    />
                                </Col>
                                <Col xs='6'>
                                    <div className='d-flex flex-column'>
                                        <h3 className='product-title'>{order.name}</h3>
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
                                                {order.type}
                                            </p>
                                            <p>
                                                <div className='icon-margin-align'>
                                                    <i class="fa-solid fa-paperclip"></i>
                                                </div>
                                                1 PDF Included
                                            </p>
                                            <span
                                                onClick={() => downloadClick(order)}
                                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                            >
                                                Click to Download
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs='3' style={{ textAlign: 'right' }}>
                                    {order.price && (
                                        <h3>${order.price.toFixed(2)}</h3>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    )) : (
                        <p>No Orders</p>
                    )
            }
        </>
    )
}

export default Orders