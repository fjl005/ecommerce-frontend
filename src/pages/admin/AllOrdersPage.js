import { Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import NavbarApp from "../../components/navbar/NavbarApp";
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";
import ItemsInOrder from '../../components/orders/ItemsInOrder';
import NavbarAdmin from "../../components/admin/NavbarAdmin";

const AllOrdersPage = () => {
    const [loadingOrdersPage, setLoadingOrdersPage] = useState(true);
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axiosWithAuth.get(`/orders`);
            const data = response.data;
            setOrdersData(data);
            setLoadingOrdersPage(false);
        } catch (error) {
            console.log('error with fetching reviews in AllReviewsPage.js: ', error);
            setLoadingOrdersPage(false);
        }
    };

    return (
        <>
            <NavbarAdmin />
            <Container>
                <Row>
                    <Col>
                        <h1>All Orders</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {ordersData.length > 0 && ordersData.map((order, idx) => (
                            <ItemsInOrder
                                key={idx}
                                order={order}
                                orderId={order._id}
                                buyer={order.username}
                                adminPage={true}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AllOrdersPage;