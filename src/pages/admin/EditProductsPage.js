import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { Container, Row, Col, Button } from 'reactstrap';
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import { useState, } from 'react'
import { useLoginContext } from "../../components/login/LoginContext";
import { Link } from "react-router-dom";
import ProductsHomePage from "../../components/products/ProductsHomePage";

const EditProductsPage = () => {

    const { admin } = useLoginContext();

    // States
    const [itemsSelectedIdArr, setItemsSelectedIdArr] = useState([]);
    const [reloadProducts, setReloadProducts] = useState(false);

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
                data: itemsSelectedIdArr
            });
            alert('Products have been deleted');
        } catch (error) {
            console.log('Error in deleteProduct() in Products.js', error);
        } finally {
            setReloadProducts(false);
        }
    }

    return (
        <>
            <NavbarAdmin />
            {admin ? (
                <>
                    <Container>
                        <Row>
                            <Col>
                                <h1 className='h1-admin'>Edit Products</h1>
                                <h4>Click on an individual item to edit the listing. To edit or delete multiple listings at once, then click on the corresponding checkboxes.</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {itemsSelectedIdArr.length > 0 && (
                                    <>
                                        <Link
                                            to={itemsSelectedIdArr.length === 1
                                                ? `/admin/updateproduct/${itemsSelectedIdArr[0]}`
                                                : `/admin/updateproduct?items=${JSON.stringify(itemsSelectedIdArr)}`
                                            }
                                        >
                                            <Button> Edit {itemsSelectedIdArr.length} Listings</Button>
                                        </Link>


                                        <Button
                                            onClick={() => handleDeleteClick()}
                                            className='bg-danger'
                                            style={{ marginLeft: '2rem' }}
                                        >
                                            Delete {itemsSelectedIdArr.length} Listings
                                        </Button>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Container>
                    <ProductsHomePage
                        adminPage={true}
                        itemsSelectedIdArr={itemsSelectedIdArr}
                        setItemsSelectedIdArr={setItemsSelectedIdArr}
                        reloadProducts={reloadProducts}
                    />
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