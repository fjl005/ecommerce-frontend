import { Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import ItemsInOrder from '../../components/orders/ItemsInOrder';
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";

const AllOrdersPage = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavbarAdmin currentPage={NAV_TITLE_MATCH.allorders} />
            <Container>
                <Row>
                    <Col>
                        <h1 className='h1-admin'>All Orders</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {loading ? (
                            <SpinningIcon size='2x' />
                        ) : ordersData.length > 0 && ordersData.map((order, idx) => (
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