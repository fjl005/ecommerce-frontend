import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col } from "reactstrap";
import { useCartContext } from "../../components/cart/CartContext";
import { useLoginContext } from "../../components/login/LoginContext";
import ItemsInOrder from '../../components/orders/ItemsInOrder';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";

const OrderCompletedRedirectPage = () => {
    const { orderId } = useParams();

    const { loggedIn, setLoggedIn, checkUser } = useLoginContext();
    const [recentOrder, setRecentOrder] = useState({});
    // const [loadingPage, setLoadingPage] = useState(true);


    useEffect(() => {
        checkUser();
        fetchRecentOrder();
    }, []);

    // useEffect(() => {
    //     setTimeout(() => setLoadingPage(false), 1000);
    // }, [loggedIn]);

    const fetchRecentOrder = async () => {
        try {
            const response = await axiosWithAuth.get(`/orders/user/${orderId}`);
            const data = response.data;

            if (data) {
                console.log('data: ', data);
                setRecentOrder(data);

                // setLoadingPage(false);
            }
        } catch (error) {
            // if (error.response.data == "You must log in before accessing this page") {
            //     setLoadingPage(false);
            //     setLoggedIn(false);
            // }
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
                        <h5>You can view your order down below and can check it again in the "Orders" Section.</h5>
                    </Col>
                </Row>

                <Row>
                    {recentOrder && recentOrder._id && (
                        <ItemsInOrder
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