import NavbarApp from "../../components/navbar/NavbarApp";
import { Container, Row, Col, Button } from 'reactstrap';
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";
import { useState, useEffect } from 'react'
import Products from "../../components/products/Products";
import { useLoginContext } from "../../components/login/LoginContext";
import { Link } from "react-router-dom";

const EditProductsPage = () => {

    const { admin } = useLoginContext();

    // States
    const [allProducts, setAllProducts] = useState([]);
    const [itemSelectedIdArr, setItemSelectedIdArr] = useState([]);
    const [reloadProducts, setReloadProducts] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axiosWithAuth.get('/products');
        const data = response.data;
        setAllProducts(data);
    };

    const handleEditClick = () => {
        console.log('editing the following listings: ', itemSelectedIdArr);
    };

    const handleDeleteClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete the selected items?");
        if (confirmed) {
            deleteProducts();
        }
    };

    const deleteProducts = async () => {
        try {
            setReloadProducts(true);
            const response = await axiosWithAuth.delete(`/products/multiple/items`, {
                data: itemSelectedIdArr
            });
            console.log('response: ', response);
            alert('Products have been deleted');
            fetchProducts();
        } catch (error) {
            console.log('Error in deleteProduct() in Products.js', error);
        } finally {
            setReloadProducts(false);
        }
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
                                <h4>Click on an individual item to edit the listing. To edit or delete multiple listings at once, then click on the corresponding checkboxes.</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {itemSelectedIdArr.length > 0 && (
                                    <>
                                        <Link to={itemSelectedIdArr.length === 1 ? `/admin/updateproduct/${itemSelectedIdArr[0]}` : `/admin/updateproduct?items=${JSON.stringify(itemSelectedIdArr)}`}>

                                            <Button
                                                onClick={() => handleEditClick()}
                                            >
                                                Edit {itemSelectedIdArr.length} Listings
                                            </Button>
                                        </Link>


                                        <Button
                                            onClick={() => handleDeleteClick()}
                                            className='bg-danger'
                                            style={{ marginLeft: '20px' }}
                                        >
                                            Delete {itemSelectedIdArr.length} Listings
                                        </Button>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Container>
                    <Products adminPage={true} itemSelectedIdArr={itemSelectedIdArr} setItemSelectedIdArr={setItemSelectedIdArr} reloadProducts={reloadProducts} />
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

export default EditProductsPage;