import { Col, Container, Row, FormGroup, Label, Input, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";
import { useLoginContext } from "../../components/login/LoginContext";
import ProductSubmitted from "../../components/admin/ProductSubmitted";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PostProductPage = () => {

    const { admin } = useLoginContext();

    // Grab productId from the URL, if it exists.
    const { productId } = useParams();

    /* 
        -useLocation: allows us to access info about the current URL, including the query parameters.
        -location.search is a property of the location object that contains the query string portion of the URL (including the ?). 
        -URLSearchParams is a built-in JS class that allows you to work with query parameters
        -We are retrieving the value associated with the key 'items' from the query parameters
        -Then convert the JSON string into a JS array.
    */
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemStr = searchParams.get('items');
    const itemSelectedIdArr = JSON.parse(itemStr);

    console.log('itemSelectedIdArr: ', itemSelectedIdArr);

    const [productSuccessMsg, setProductSuccessMsg] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [newProductData, setNewProductData] = useState({});
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const validationSchema = Yup.object({
        productTitle: Yup.string().required('Title is required'),
        productPrice: Yup.number()
            .positive('Price must be positive')
            .max(9999.99, 'Price must be less than or equal to $9,999.99')
            .test(
                'is-decimal',
                'Price must have up to two decimal places',
                /* 
                    ^: notes the start of the string
                    \d*: any number of digits
                    \.: a literal period
                    \d{1,2}: followed by either 1 or 2 digits
                    |: or
                    \d+: any number of digits without a period.

                    (not used) [^]: means anything that's NOT.
                */
                (value) => /^(\d*\.\d{1,2}|\d+)$/.test(value)
            ),
        productDescription: Yup.string().required('Description is required'),
        productType: Yup.string().required('Product Type is required').oneOf(['Digital Download', 'Physical Item'], 'Invalid Product Type'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log('Form values: ', values);

        const { productType, productTitle, productPrice, productDescription } = values;

        try {
            if (itemSelectedIdArr && !productId) {
                // PUT operation: updating existing product.
                const response = await axiosWithAuth.put(`/products/multiple/items`, {
                    productIds: itemSelectedIdArr,
                    updatedInfo: {
                        name: productTitle,
                        price: productPrice,
                        description: productDescription,
                        productType
                    }
                });

                const data = response.data;
                console.log('data: ', data);
                setNewProductData(data);
                setProductSuccessMsg('Product successfully updated!');
            } else if (productId) {
                // PUT operation: updating existing product.

                const response = await axiosWithAuth.put(`/products/${productId}`, {
                    name: productTitle,
                    price: productPrice,
                    description: productDescription,
                    productType
                });

                const data = response.data;
                setNewProductData(data);
                setProductSuccessMsg('Product successfully updated!');

            } else {
                // POST operation: creating new product.
                let imgUrl = '';
                try {
                    const serverCheck = await axios.post('http://localhost:5000/cloudinary');

                    const formDataImg = new FormData();
                    formDataImg.append('file', imageFile);
                    formDataImg.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

                    const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formDataImg);

                    const cloudinaryData = cloudinaryRes.data;
                    console.log('cloudinary data: ', cloudinaryData);
                    imgUrl = cloudinaryData.secure_url;

                } catch (error) {
                    console.log('error with cloudinary: ', error);
                }

                console.log('img url: ', imgUrl);

                const response = await axiosWithAuth.post('/products', {
                    name: productTitle,
                    price: productPrice,
                    description: productDescription,
                    productType,
                    // imgUrl
                });
                const data = response.data.product;
                setNewProductData(data);
                setProductSuccessMsg('Product successfully submitted!');
            }
        } catch (error) {
            console.log('error in handleSubmit() in PostProduct.js: ', error);
        } finally {
            setSubmitting(false);
            setSubmitted(true);
        }
    };

    // States for the form
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [productType, setProductType] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        if (productId) {
            fetchProduct();
        } else if (itemSelectedIdArr) {
            fetchProduct(itemSelectedIdArr[0]);
        }
    }, []);

    const fetchProduct = async (itemId) => {
        let id;

        if (!itemId) {
            id = productId;
        } else {
            id = itemId;
        }

        try {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            const data = response.data;
            setTitle(data.name);
            setPrice(data.price);
            setProductType(data.productType);
            setDescription(data.description);
        } catch (error) {
            console.log('error in fetch product in PostProduct.js: ', error);
        }
    };

    return (
        <>
            <NavbarAdmin />
            {admin ? (
                submitted ? (
                    <ProductSubmitted
                        title={newProductData.name}
                        price={newProductData.price}
                        productType={newProductData.productType}
                        description={newProductData.description}
                        productId={productId}
                        itemSelectedIdArr={itemSelectedIdArr}
                    />
                ) : (
                    <Container>
                        <Row>
                            <Col>
                                {itemSelectedIdArr ? (
                                    <h1>Update {itemSelectedIdArr.length} listings</h1>
                                ) :
                                    productId ? (
                                        <h1>Update Existing Product</h1>
                                    ) : (
                                        <h1>Add New Product</h1>
                                    )}
                            </Col>
                        </Row>
                        <Row>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    productType: productType,
                                    productTitle: title,
                                    productPrice: price,
                                    productDescription: description,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {/* This callback function disables the submit button when submitting. 'isSubmitting' is automatically provided by Formik. */}
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Col>
                                            <Label for='product-title'>
                                                <h4>Product Title</h4>
                                            </Label>
                                            <Field type='text' name='productTitle' id='product-title' as={Input} />
                                            <ErrorMessage name='productTitle' component='div' className='text-danger' />

                                        </Col>
                                        <Col>
                                            <Label for='product-price'>
                                                <h4>Price</h4>
                                            </Label>
                                            <div className='d-flex align-items-center'>
                                                <span style={{ fontSize: '25px' }}>$</span>
                                                <Field type='text' name='productPrice' id='product-price' as={Input} style={{ width: '200px' }} />
                                            </div>
                                            <ErrorMessage name='productPrice' component='div' className='text-danger' />

                                        </Col>
                                        <Col>
                                            <Label for='product-description'>
                                                <h4>Product Description</h4>
                                            </Label>
                                            <Field type='textarea' name='productDescription' id='product-description' as={Input} />
                                            <ErrorMessage name='productDescription' component='div' className='text-danger' />

                                        </Col>
                                        <Col>
                                            <Label for='product-type' style={{ margin: '0' }}>
                                                <h4 style={{ marginBottom: '0' }}>Product Type</h4>
                                            </Label>
                                            <Field
                                                type='select'
                                                name='productType'
                                                id='product-type'
                                                as={Input}
                                                style={{ width: '200px' }}
                                            >
                                                <option value='' disabled>Select</option>
                                                <option value='Digital Download'>Digital Download</option>
                                                <option value='Physical Item'>Physical Item</option>
                                            </Field>
                                            <ErrorMessage name='productType' component='div' className='text-danger' />
                                        </Col>
                                        <Col>
                                            <h4>Images</h4>
                                            <Input
                                                name='productImg'
                                                id='img'
                                                type='file'
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            // disabled={} 
                                            />
                                        </Col>

                                        <Button type='submit' className='bg-primary' disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </Button>
                                    </Form>
                                )}

                            </Formik>
                        </Row>
                        {productSuccessMsg && (
                            <Row>
                                <Col>
                                    {productSuccessMsg}
                                </Col>
                            </Row>
                        )}

                    </Container>
                )
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

export default PostProductPage;