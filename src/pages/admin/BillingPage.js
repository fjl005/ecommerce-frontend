import { Col, Container, Row, Table } from "reactstrap";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import { useState, useEffect } from "react";
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";

const BillingPage = () => {
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    // Trying new format since I've been doing arrow functions all day.
    async function fetchAllOrders() {
        try {
            const response = await axiosWithAuth('/orders');
            console.log('response: ', response.data);
            setAllOrders(response.data);
        } catch (error) {

        }
    }


    return (
        <>
            <NavbarAdmin />
            <Container>
                <Row>
                    <Col>
                        <h1>Billing</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{ width: '8%' }}></th>
                                    <th style={{ width: '10%' }}>Date</th>
                                    <th style={{ width: '10%' }}>Type</th>
                                    <th style={{ width: '30%' }}>Description</th>
                                    <th style={{ width: '10%' }}>Amount</th>
                                    <th style={{ width: '10%' }}>Fee and Tax</th>
                                    <th style={{ width: '10%' }}>Net</th>
                                    <th style={{ width: '10%' }}>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders && allOrders.map((order, orderIdx) => {
                                    const dateParts = new Date(order.orderDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    }).split(' ');

                                    const formattedDate = `${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`;

                                    return order.items.map((item, itemIdx) => (
                                        <tr key={item._id}>
                                            <td>
                                                <img src={twoPageAirbnb} alt='listing image' style={{ width: '100%' }} />
                                            </td>
                                            <td style={{ verticalAlign: 'middle' }}>{formattedDate}</td>
                                            <td style={{ verticalAlign: 'middle' }}>{item.productType}</td>
                                            <td style={{ verticalAlign: 'middle' }}>
                                                {item.name}
                                            </td>
                                            <td style={{ verticalAlign: 'middle' }}>${item.price.toFixed(2)}</td>
                                            <td style={{ verticalAlign: 'middle' }}>${(item.price * 0.0775).toFixed(2)}</td>
                                            <td style={{ verticalAlign: 'middle' }}>${(item.price - item.price * 0.0775).toFixed(2)}</td>
                                            <td style={{ verticalAlign: 'middle' }}>Balance (total + net) </td>
                                        </tr>
                                    ))
                                })}
                                {/* <tr>
                                    <td>
                                        <img src={twoPageAirbnb} alt='listing image' style={{ width: '100%' }} />
                                    </td>
                                    <td style={{ verticalAlign: 'middle' }}>date</td>
                                    <td style={{ verticalAlign: 'middle' }}>type</td>
                                    <td style={{ verticalAlign: 'middle' }}>description</td>
                                    <td style={{ verticalAlign: 'middle' }}>amount</td>
                                    <td style={{ verticalAlign: 'middle' }}>fee and tax (7.5%, no fee)</td>
                                    <td style={{ verticalAlign: 'middle' }}>net (amount - fee/tax)</td>
                                    <td style={{ verticalAlign: 'middle' }}>balance (total + net) </td>
                                </tr> */}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default BillingPage