import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { Container, Row, Col, Button } from 'reactstrap';
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import { useState, } from 'react'
import { useLoginContext } from "../../contexts/LoginContext";
import { Link } from "react-router-dom";
import ProductsHomePage from "../../components/products/ProductsHomePage";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";

const EditProductsSelection = () => {

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
            await axiosWithAuth.delete(`/products/multiple/items`, {
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
            <NavbarAdmin currentPage={NAV_TITLE_MATCH.editproducts} />
            {admin ? (
                <>
                    <Container>
                        <Row>
                            <Col>
                                <h1 className='h1-admin'>Edit Products</h1>
                                <h4 className='ml-3'>Click on an individual item to edit the listing. To edit or delete multiple listings at once, then click on the corresponding checkboxes.</h4>
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
                                            <Button className='border-0'> Edit {itemsSelectedIdArr.length} Listings</Button>
                                        </Link>

                                        <Button
                                            onClick={() => handleDeleteClick()}
                                            className='bg-danger border-0 ml-3'
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

export default EditProductsSelection;