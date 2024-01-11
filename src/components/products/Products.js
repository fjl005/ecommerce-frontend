import { Container, Row, Col, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';
import { axiosNoAuth, axiosWithAuth } from "../miscellaneous/axios";
import LoadingOverlay from "../miscellaneous/LoadingOverlay";
import { useProductContext } from "../../components/products/ProductContext";


const Products = ({ adminPage, itemSelectedIdArr, setItemSelectedIdArr, reloadProducts }) => {

    const { searchQuery } = useProductContext();

    const [productsDB, setProductsDB] = useState([]);
    const [fetchDone, setFetchDone] = useState(false);
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

            console.log('end term: ', endTerm);
            const response = await axiosNoAuth.get(`/products${endTerm}`);
            setProductsDB(response.data);
            setFetchDone(true);
        } catch (error) {
            console.log('Error in fetchProducts() in Products.js', error);
        }
    };

    const handleCheckbox = (productId) => {
        if (itemSelectedIdArr) {
            if (itemSelectedIdArr.includes(productId)) {
                // Deselected item, remove from array since it was previously checkmarked.
                const updatedArr = itemSelectedIdArr.filter((id) => id !== productId);
                setItemSelectedIdArr(updatedArr);
            } else {
                // Otherwise, add item to array
                setItemSelectedIdArr([...itemSelectedIdArr, productId]);
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
            setItemSelectedIdArr([]);
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
                    {(fetchDone && productsDB.length < 1) && (
                        <h4>No Products Found.</h4>
                    )}
                </Col>
            </Row>
            <Row>
                {isDeleting ? (
                    <LoadingOverlay />
                ) : fetchDone && productsDB.length > 0 &&
                productsDB.map((product, idx) => (
                    <Col
                        key={idx} xs='6' md='4' lg='3'
                        className='product-item-homepage'
                        style={{ border: itemSelectedIdArr ? (itemSelectedIdArr.includes(product._id) ? '1px solid black' : '') : '' }}
                    >
                        <Link to={adminPage ? `/admin/updateproduct/${product._id}` : `/products/${product._id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    padding: '10px 5px 0px 5px'
                                }}
                            >
                                <img
                                    src={product.pictures && product.pictures.length > 0 ? product.pictures[0].url : fetsyEcommerceLogo}
                                    alt='image of product'
                                    style={{
                                        width: '300px',
                                        height: '300px',
                                        objectFit: 'cover',
                                        // objectPosition: 'center center',
                                    }}
                                />

                                <h6
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >{product.name}</h6>
                                <h4>${product.price.toFixed(2)}</h4>
                            </div>
                        </Link>

                        {adminPage && (
                            <div
                                style={{
                                    marginTop: '0px',
                                    width: '100%',
                                    padding: '0px 5px 10px 5px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <Input
                                    type="checkbox"
                                    style={{ width: '25px', height: '25px' }}
                                    checked={itemSelectedIdArr.includes(product._id)}
                                    onChange={() => handleCheckbox(product._id)}
                                />
                                <Button
                                    className='bg-danger'
                                    onClick={() => handleDelete(product)}
                                >
                                    Delete </Button>
                            </div>
                        )}
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Products;