import { Col, Container, Row, Table } from "reactstrap";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { useState, useEffect } from "react";
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";

const BillingPage = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    async function fetchAllOrders() {
        try {
            const response = await axiosWithAuth('/orders');
            setAllOrders(response.data.orders);
            setTotalBalance(response.data.totalBalance);
            console.log(response.data.orders);
        } catch (error) {
            console.log('error in fetchAllOrders() in BillingPage.js. ', error);
        } finally {
            setLoading(false);
        }
    };

    let total = totalBalance;
    let balance = totalBalance;
    let prevPrice = null;

    return (
        <>
            <NavbarAdmin currentPage={NAV_TITLE_MATCH.billing} />
            <Container>
                <Row className='mb-3'>
                    <Col>
                        <h1 className='h1-admin'>Billing</h1>
                        <h4>Net Balance: ${totalBalance.toFixed(2)}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {loading ? (
                            <SpinningIcon size='2x' />
                        ) : (
                            <Table className='text-center'>
                                <thead>
                                    <tr>
                                        <th style={{ width: '8%' }}></th>
                                        <th style={{ width: '12%' }}>Date</th>
                                        <th style={{ width: '20%' }}>Type</th>
                                        <th style={{ width: '40%' }}>Product Name</th>
                                        <th style={{ width: '10%' }}>Amount</th>
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
                                        return order.items.map((item) => {
                                            if (prevPrice) {
                                                balance -= prevPrice;
                                            }
                                            prevPrice = item.price;

                                            return (
                                                <tr key={item._id}>
                                                    <td>
                                                        <img
                                                            src={(item.pictures && item.pictures.length > 0) ? item.pictures[0].url : fetsyEcommerceLogo}
                                                            alt={item.name}
                                                            className='w-100'
                                                        />
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }}>{formattedDate}</td>
                                                    <td style={{ verticalAlign: 'middle' }}>{item.productType}</td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        {item.productName}
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }}>${item.price.toFixed(2)}</td>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                        ${balance.toFixed(2)}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    })}
                                </tbody>
                            </Table>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default BillingPage