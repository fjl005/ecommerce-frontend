import { Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import ItemsInOrder from '../../components/orders/ItemsInOrder';
import NavbarAdmin from "../../components/admin/NavbarAdmin";

const AllOrdersPage = () => {
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axiosWithAuth.get(`/orders`);
            const data = response.data.orders;
            setOrdersData(data);
        } catch (error) {
            console.log('error with fetching reviews in AllReviewsPage.js: ', error);
        }
    };

    return (
        <>
            <NavbarAdmin />
            <Container>
                <Row>
                    <Col>
                        <h1 className='h1-admin'>All Orders</h1>
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