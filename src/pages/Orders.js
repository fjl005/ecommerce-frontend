import NavbarApp from "../components/navbar/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';
import { useState, useEffect } from "react";
import twoPageAirbnb from '../img/twoPageAirbnb.png';
import { useLocation } from "react-router-dom";
import { useCartContext } from "../components/cart/CartContext";
import { useLoginContext } from "../components/login/LoginContext";
import OrderItem from "../components/orders/OrderItem";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";


const Orders = () => {
    // const location = useLocation();
    const { cartLength } = useCartContext();
    const { loggedIn, setLoggedIn, checkUser } = useLoginContext();

    const [ordersData, setOrdersData] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        checkUser();
        fetchOrders();
    }, []);

    useEffect(() => {
        setTimeout(() => setLoadingPage(false), 1000);
    }, [loggedIn]);

    const fetchOrders = async () => {
        try {
            const response = await axiosWithAuth.get('/orders');
            const data = response.data;
            if (data) {
                setOrdersData(data);
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
            ) : ordersData.length > 0 ?
                ordersData.map((order, idx) => (
                    <OrderItem
                        key={idx}
                        order={order}
                    />
                )) : (
                    <Container>
                        <Row>
                            <Col>
                                <p>No Orders</p>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </>
    )
}

export default Orders