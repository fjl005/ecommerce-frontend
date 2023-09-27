import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col } from 'reactstrap';
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";
import { useState, useEffect } from 'react'
import Products from "../../components/products/Products";
import { useLoginContext } from "../../components/login/LoginContext";


const EditProducts = () => {

    const { admin } = useLoginContext();


    // States
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axiosWithAuth.get('/products');
        const data = response.data;
        console.log('data: ', data);
        setAllProducts(data);
    }


    return (
        <>
            <NavbarApp />
            {admin ? (
                <>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Edit Products</h1>
                                <p>Select a product below and choose to edit or delete.</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4>Edit  /  Delete</h4>
                            </Col>
                        </Row>
                    </Container>
                    <Products adminPage={true} />
                </>
            ) : (
                <Container>
                    <Row>
                        <Col>
                            <h1>You are not the admin. You cannot access this page.</h1>
                        </Col>
                    </Row>
                </Container>
            )}


        </>
    )
}

export default EditProducts