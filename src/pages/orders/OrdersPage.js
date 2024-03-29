import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import { useLoginContext } from "../../contexts/LoginContext";
import OrderItems from "../../components/orders/OrderItems";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";

const OrdersPage = () => {

    const { loggedIn, setLoggedIn, checkUser } = useLoginContext();
    const [ordersData, setOrdersData] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        checkUser();
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axiosWithAuth.get('/orders/user');
            const data = response.data;
            if (data) {
                setOrdersData(data);
            }
        } catch (error) {
            console.log('error: ', error);
            if (error.response.data === "You must log in before accessing this page") {
                setLoggedIn(false);
            }
        } finally {
            setLoadingPage(false);
        }
    };


    return (
        <>
            <NavbarApp currentPage={NAV_TITLE_MATCH.orders} />
            <Container>
                <Row>
                    <Col>
                        {loadingPage ? (
                            <SpinningIcon size='2x' />
                        ) : !loggedIn ? (
                            <h1>You must log in to see your orders.</h1>
                        ) : (
                            ordersData.length > 0 ? (
                                <>
                                    <h1>View Your Orders</h1>
                                    {ordersData.length > 0 &&
                                        ordersData.map((order, idx) => (
                                            <OrderItems
                                                key={idx}
                                                order={order}
                                                orderId={order._id}
                                            />
                                        ))
                                    }
                                </>
                            ) : (
                                <h1>No Orders</h1>
                            )
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
};

export default OrdersPage;