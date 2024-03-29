import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { useLoginContext } from "../../contexts/LoginContext";
import OrderItems from '../../components/orders/OrderItems';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosWithAuth } from "../../components/miscellaneous/axios";

const OrderCompletedRedirectPage = () => {
    const { orderId } = useParams();
    const { checkUser } = useLoginContext();
    const [recentOrder, setRecentOrder] = useState({});

    useEffect(() => {
        checkUser();
        fetchRecentOrder();
    }, []);

    const fetchRecentOrder = async () => {
        try {
            const response = await axiosWithAuth.get(`/orders/user/${orderId}`);
            const data = response.data;

            if (data) {
                console.log('data: ', data);
                setRecentOrder(data);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }


    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h3>Order is complete! </h3>
                        <h5 className='mb-4'>You can view your order down below and can check it again in the "Orders" Section.</h5>
                    </Col>
                </Row>

                <Row>
                    {recentOrder && recentOrder._id && (
                        <OrderItems
                            order={recentOrder}
                            orderId={recentOrder._id}
                        />
                    )}
                </Row>
            </Container>
        </>
    )
}

export default OrderCompletedRedirectPage;