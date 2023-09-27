import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import { productsArray } from "./productsArray";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import twoPageAirbnb from '../../img/twoPageAirbnb.png';
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";


const Products = ({ adminPage }) => {

    const [productsDB, setProductsDB] = useState([]);
    const [fetchDone, setFetchDone] = useState(false);
    const [itemSelectIdArr, setItemSelectIdArr] = useState([]);

    useEffect(() => {
        // axios.get('http://localhost:5000/products/')
        //     .then(response => {
        //         setProductsDB(response.data);
        //         setFetchDone(true);
        //     }).catch(error => console.log('error with get request to products: ', error));
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products/');
            setProductsDB(response.data);
            setFetchDone(true);
        } catch (error) {
            console.log('Error in fetchProducts() in Products.js', error);
        }

    }

    // maybe turn this into an array?
    const handleCheckbox = (productId) => {
        if (itemSelectIdArr.includes(productId)) {
            const updatedArr = itemSelectIdArr.filter((id) => id !== productId);
            setItemSelectIdArr(updatedArr);
        } else {
            setItemSelectIdArr([...itemSelectIdArr, productId]);
        }
    };

    const handleClickItem = (productId) => {
        console.log('item clicked: ', productId);
    };

    useEffect(() => {
        console.log('selected id: ', itemSelectIdArr);
    }, [itemSelectIdArr]);

    const handleDelete = (productId) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            deleteProduct(productId);
        }
    }

    const deleteProduct = async (productId) => {
        try {
            await axiosWithAuth.delete(`/products/${productId}`);
            alert('Product has been deleted');
            fetchProducts();
        } catch (error) {
            console.log('Error in deleteProduct() in Products.js', error);
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Products (accessing mongodb)</h1>
                </Col>
            </Row>
            <Row>
                {fetchDone && productsDB.length > 0 &&
                    productsDB.map((product, idx) => (
                        <Col
                            key={idx} xs='6' md='4' lg='3'
                            className='product-item-homepage'
                            style={{ border: itemSelectIdArr.includes(product._id) ? '1px solid black' : '' }}
                        >
                            <Link to={adminPage ? `/admin/editproduct/${product._id}` : `/products/${product._id}`}
                                // target='_blank' 
                                onClick={() => handleClickItem(product._id)}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}>
                                <div style={{
                                    width: '100%',
                                    padding: '10px 5px 0px 5px'
                                }}>
                                    <img
                                        src={twoPageAirbnb}
                                        alt='image of product'
                                        style={{
                                            width: '100%',
                                            height: 'auto'
                                        }}
                                    />
                                    <h6
                                        style={{
                                            whiteSpace: 'nowrap', // Prevents text from wrapping
                                            overflow: 'hidden', // Hide overflowing text
                                            textOverflow: 'ellipsis' // Display ellipsis for long text
                                        }}
                                    >{product.name}</h6>
                                    <h4>${product.price.toFixed(2)}</h4>
                                </div>
                            </Link>

                            {adminPage && (
                                <div style={{
                                    marginTop: '0px',
                                    width: '100%',
                                    padding: '0px 5px 10px 5px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Input
                                        type="checkbox"
                                        style={{ width: '25px', height: '25px' }}
                                        checked={itemSelectIdArr.includes(product._id)}
                                        onChange={() => handleCheckbox(product._id)}
                                    />
                                    <Button
                                        className='bg-danger'
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>

                            )}

                        </Col>
                    ))
                }
            </Row>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
            </Row>
            <Row>
                {productsArray.map((product, idx) => (
                    <Col key={idx} xs='6' md='4' lg='3' className='product-item-homepage'>
                        <Link to={`/products/${product.productId}`}
                            // target='_blank' 
                            style={{
                                textDecoration: 'none',
                                color: 'black'
                            }}>
                            <div style={{
                                width: '100%',
                                padding: '10px 5px'
                            }}>
                                <img
                                    src={product.img[0]}
                                    alt='image of product'
                                    style={{
                                        width: '100%',
                                        height: 'auto'
                                    }}
                                />
                                <h6
                                    style={{
                                        whiteSpace: 'nowrap', // Prevents text from wrapping
                                        overflow: 'hidden', // Hide overflowing text
                                        textOverflow: 'ellipsis' // Display ellipsis for long text
                                    }}
                                >{product.name}</h6>
                                <h4>${product.price.toFixed(2)}</h4>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Products