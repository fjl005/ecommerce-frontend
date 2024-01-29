import { Container, Row, Col, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { axiosNoAuth, axiosWithAuth } from "../miscellaneous/axios";
import LoadingOverlay from "../miscellaneous/LoadingOverlay";
import SpinningIcon from "../miscellaneous/SpinningIcon";
import { useProductSearchContext } from "./ProductSearchContext";

const ProductsHomePage = ({ adminPage, itemsSelectedIdArr, setItemsSelectedIdArr, reloadProducts }) => {

    const { searchQuery } = useProductSearchContext();
    const [productsDB, setProductsDB] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);


    useEffect(() => {
        fetchProducts();
    }, [reloadProducts, searchQuery]);


    const fetchProducts = async () => {
        try {
            let endTerm = '';
            if (searchQuery) {
                endTerm = `/search/${searchQuery}`
            }

            const response = await axiosNoAuth.get(`/products${endTerm}`);
            setProductsDB(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Error in fetchProducts() in Products.js', error);
            setLoading(false);
        }
    };

    const handleCheckbox = (productId) => {
        if (itemsSelectedIdArr) {
            if (itemsSelectedIdArr.includes(productId)) {
                const updatedArr = itemsSelectedIdArr.filter((id) => id !== productId);
                setItemsSelectedIdArr(updatedArr);
            } else {
                setItemsSelectedIdArr([...itemsSelectedIdArr, productId]);
            }
        }
    };

    const handleDelete = (product) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            deleteProduct(product);
        }
    };

    const deleteProduct = async (product) => {
        setIsDeleting(true);

        try {
            for (let imgObj of product.pictures) {
                await axiosWithAuth.delete(`/cloudinary/${imgObj.publicId}`);
            }

            await axiosWithAuth.delete(`/products/${product._id}`);
            alert('Product has been deleted');
            setItemsSelectedIdArr([]);
            fetchProducts();
        } catch (error) {
            console.log('Error in deleteProduct() in Products.js', error);
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <Container>
            <Row>
                <Col>
                    <h1>Products</h1>
                    {loading ? (
                        <SpinningIcon size='2x' />
                    ) : productsDB.length < 1 && (
                        <h4>No Products Found.</h4>
                    )}
                </Col>
            </Row>

            <Row>
                {isDeleting ? (
                    <LoadingOverlay />
                ) : !loading && productsDB.length > 0 &&
                productsDB.map((product, idx) => (
                    <Col
                        key={idx} xs='6' md='4' lg='3'
                        className='product-item-homepage'
                        style={{
                            border: itemsSelectedIdArr
                                && (itemsSelectedIdArr.includes(product._id) ? '1px solid black' : '')
                        }}
                    >
                        <Link
                            to={
                                adminPage
                                    ? `/admin/updateproduct/${product._id}`
                                    : `/products/${product._id}`}
                            className='black-normal-text'
                        >
                            <div style={{ padding: '10px', width: '100%' }}>
                                <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
                                    <img
                                        src={
                                            (product.pictures && product.pictures.length > 0)
                                                ? product.pictures[0].url
                                                : fetsyEcommerceLogo
                                        }
                                        alt={product.name}
                                        className='product-img-abs'
                                    />
                                </div>

                                <h6 className='no-overflow-text' style={{ marginTop: '10px' }}>
                                    {product.name}
                                </h6>

                                <h4>${product.price.toFixed(2)}</h4>
                            </div>
                        </Link>

                        {adminPage && (
                            <div
                                style={{
                                    padding: '0px 5px 10px 5px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Input
                                    type="checkbox"
                                    style={{ width: '25px', height: '25px' }}
                                    checked={itemsSelectedIdArr.includes(product._id)}
                                    onChange={() => handleCheckbox(product._id)}
                                />
                                <Button
                                    className='bg-danger no-border-btn'
                                    onClick={() => handleDelete(product)}
                                    style={{ border: 'none' }}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductsHomePage;