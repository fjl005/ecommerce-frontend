
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { Container, Row, Col, } from "reactstrap";
import { Link } from "react-router-dom";
import { useLoginContext } from "../../components/login/LoginContext";

const AdminPage = () => {

    const { admin } = useLoginContext();

    return (
        <>
            <NavbarAdmin />
            <Container>
                {admin ? (
                    <>
                        <Row>
                            <Col>
                                <h1 className='h1-admin'>
                                    Admin Page
                                </h1>
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
                                {/* <p>Add Sale - Feature coming soon.</p> */}
                                <p>
                                    <Link to='/admin/billing'>
                                        View Billing
                                    </Link>
                                </p>

                            </Col>
                        </Row>

                        {/* <Row>
                            <Col>
                                <h3>Settings:</h3>
                                <p>Temporarily Close Shop - Feature coming soon.</p>
                                <p>Delete Shop - Feature coming soon.</p>
                            </Col>
                        </Row> */}
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