import { Col, Container, Row, FormGroup, Label, Input, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import NavbarApp from "../../components/navbar/NavbarApp";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";
import { useLoginContext } from "../../components/login/LoginContext";
import ProductSubmitted from "../../components/admin/ProductSubmitted";


const AddNewProduct = () => {

    const { admin } = useLoginContext();

    const [loadingPage, isLoadingPage] = useState(true);
    const [productSuccessMsg, setProductSuccessMsg] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [newProductData, setNewProductData] = useState({});

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

        const response = await axiosWithAuth.post('/products', {
            name: productTitle,
            price: productPrice,
            description: productDescription,
            productType
        });
        console.log('response: ', response);
        const data = response.data.product;
        setNewProductData(data);
        setProductSuccessMsg('Product successfully submitted!');

        setSubmitting(false);
        setSubmitted(true);
    };

    return (
        <>
            <NavbarApp />
            {admin ? (
                submitted ? (
                    <ProductSubmitted
                        title={newProductData.name}
                        price={newProductData.price}
                        productType={newProductData.productType}
                        description={newProductData.description}
                    />
                ) : (
                    <Container>
                        <Row>
                            <Col>
                                <h1>Add New Product</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Formik
                                initialValues={{
                                    productType: '',
                                    productTitle: '',
                                    productPrice: 0,
                                    productDescription: '',
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

export default AddNewProduct;