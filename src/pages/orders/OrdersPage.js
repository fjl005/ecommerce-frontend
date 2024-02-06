import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import { useLoginContext } from "../../contexts/LoginContext";
import ItemsInOrder from "../../components/orders/ItemsInOrder";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";


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
                setLoadingPage(false);
            }
        } catch (error) {
            if (error.response.data === "You must log in before accessing this page") {
                setLoadingPage(false);
                setLoggedIn(false);
            }
            console.log('error: ', error);
        }
    }


    return (
        <>
            <NavbarApp currentPage='Orders' />
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
                                            <ItemsInOrder
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