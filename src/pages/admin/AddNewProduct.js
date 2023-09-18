import { Col, Container, Row, Form, FormGroup, Label, Input, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import NavbarApp from "../../components/navbar/NavbarApp";
import { useState } from "react";

const AddNewProduct = () => {

    // States
    const [productType, setProductType] = useState('Select');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (productType !== ('Digital Download' || 'Physical Item')) {
            console.log('please pick a product type')
        }

        console.log('product type: ', productType);
        console.log('submitted!');
    };

    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <h1>Add New Product</h1>
                    </Col>
                </Row>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Col>
                            <Label for='product-title'>
                                <h4>Product Title</h4>
                            </Label>
                            <Input id='product-title' />
                        </Col>
                        <Col>
                            <Label for='product-price'>
                                <h4>Price</h4>
                            </Label>
                            <Input id='product-price' />
                        </Col>
                        <Col>
                            <Label for='product-title'>
                                <h4>Product Description</h4>
                            </Label>
                            <Input id='product-description' />
                        </Col>
                        <Col>
                            <div className='d-flex align-items-center'>
                                <Label for='product-type' style={{ margin: '0' }}>
                                    <h4 style={{ marginBottom: '0' }}>Product Type</h4>
                                </Label>

                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {productType}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem
                                            onClick={() => setProductType('Digital Download')}
                                        >Digital Download</DropdownItem>
                                        <DropdownItem
                                            onClick={() => setProductType('Physical Item')}
                                        >Physical Item</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                        </Col>
                        <Col>
                            <h4>Images</h4>
                        </Col>

                        <Button type='submit' className='bg-primary'>Submit</Button>
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default AddNewProduct;