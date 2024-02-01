import { Col, Container, Row, Table } from "reactstrap";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { useState, useEffect } from "react";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';

const BillingPage = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    // Trying new format since I've been doing arrow functions all day.
    async function fetchAllOrders() {
        try {
            const response = await axiosWithAuth('/orders');
            console.log('response: ', response.data);
            setAllOrders(response.data.orders);
            setTotalBalance(response.data.totalBalance);
        } catch (error) {
            console.log('error in fetchAllOrders() in BillingPage.js. ', error);
        }
    };

    let total = totalBalance;

    return (
        <>
            <NavbarAdmin />
            <Container>
                <Row style={{ marginBottom: '20px' }}>
                    <Col>
                        <h1 className='h1-admin'>Billing</h1>
                        <h4>Net Balance: ${totalBalance.toFixed(2)}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '8%' }}></th>
                                    <th style={{ width: '12%' }}>Date</th>
                                    <th style={{ width: '20%' }}>Type</th>
                                    <th style={{ width: '40%' }}>Description</th>
                                    <th style={{ width: '10%' }}>Amount</th>
                                    {/* <th style={{ width: '10%' }}>Fee and Tax</th>
                                    <th style={{ width: '10%' }}>Net</th> */}
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

                                    return order.items.map((item, itemIdx) => {
                                        let netBalance = total - item.price;
                                        total = total - item.price;

                                        {/* Only for the first item and order: reset the balance and total to the totalBalance */ }
                                        if (itemIdx === 0 && orderIdx === 0) {
                                            netBalance += item.price;
                                            total += item.price;
                                        }

                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    {/* <img src={twoPageAirbnb} alt='listing image' style={{ width: '100%' }} /> */}

                                                    <img
                                                        src={(item.pictures && item.pictures.length > 0) ? item.pictures[0].url : fetsyEcommerceLogo}
                                                        alt='listing image'
                                                        style={{ width: '100%' }}
                                                    />
                                                </td>
                                                <td style={{ verticalAlign: 'middle' }}>{formattedDate}</td>
                                                <td style={{ verticalAlign: 'middle' }}>{item.productType}</td>
                                                <td style={{ verticalAlign: 'middle' }}>
                                                    {item.name}
                                                </td>
                                                <td style={{ verticalAlign: 'middle' }}>${item.price.toFixed(2)}</td>
                                                {/* <td style={{ verticalAlign: 'middle' }}>${(item.price * 0.0775).toFixed(2)}</td>
                                            <td style={{ verticalAlign: 'middle' }}>${(item.price - item.price * 0.0775).toFixed(2)}</td> */}
                                                <td style={{ verticalAlign: 'middle' }}>
                                                    ${netBalance.toFixed(2)}
                                                </td>
                                            </tr>
                                        )
                                    })
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