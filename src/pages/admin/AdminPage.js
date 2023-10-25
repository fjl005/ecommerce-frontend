
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import {
    Container,
    Row,
    Col,
    Table,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLoginContext } from "../../components/login/LoginContext";

const AdminPage = () => {

    const { admin } = useLoginContext();
    const statsDates = ['Yesterday', 'Today', 'Last 7 Days', 'Last Month', 'This Year', 'Last Year', 'All Time'];
    const [statsRangeSelected, setStatsRangeSelected] = useState('Today');


    return (
        <>
            <NavbarAdmin />
            <Container>
                {admin ? (
                    <>
                        <Row>
                            <Col>
                                <h1>Admin Page</h1>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <h3 style={{ marginBottom: '0' }}>
                                        Stats overview for:
                                    </h3>

                                    <UncontrolledDropdown style={{ marginLeft: '15px' }}>
                                        <DropdownToggle caret>
                                            {statsRangeSelected}
                                        </DropdownToggle>

                                        <DropdownMenu>
                                            {statsDates.map((item, idx) => (
                                                <DropdownItem
                                                    key={idx}
                                                    onClick={() => setStatsRangeSelected(item)}
                                                >
                                                    {item}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </div>

                                <Table bordered style={{ textAlign: 'center' }}>
                                    <thead>
                                        <tr>
                                            <th>Total Views</th>
                                            <th>Total Orders</th>
                                            <th>Total Views</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h3>Listings:</h3>
                                <p>
                                    <Link to='/admin/addnewproduct'>
                                        Add New Product
                                    </Link>
                                </p>
                                <p>
                                    <Link to='/admin/editproductspage'>
                                        Edit / Delete Existing Product(s)
                                    </Link>
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h3>Orders & Reviews:</h3>
                                <p>
                                    <Link to='/admin/allorders'>
                                        View All Orders
                                    </Link>
                                </p>
                                <p>
                                    <Link to='/admin/allreviews'>
                                        View All Reviews
                                    </Link>
                                </p>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h3>Finances:</h3>
                                <p>Add Sale</p>
                                <p>
                                    <Link to='/admin/billing'>
                                        View Billing
                                    </Link>
                                </p>

                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <h3>Settings:</h3>
                                <p>Temporarily Close Shop</p>
                                <p>Delete Shop</p>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Row>
                        <h1>You are not the admin. You cannot access this page.</h1>
                    </Row>
                )}
            </Container>
        </>
    )
}

export default AdminPage