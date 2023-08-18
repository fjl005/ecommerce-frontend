import { useState } from 'react'
import NavbarApp from '../components/miscellaneous/NavbarApp';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import CartItemMDB from '../components/cart/CartItemMDB';
import CartItemCheckout from '../components/cart/CartItemCheckout';

const Checkout = () => {
    // First, grab the location object of the URL, which contains data passed by Cart.js of the item ID's in the cart.
    const location = useLocation();
    console.log('location: ', location);
    // To parse the query parameters, we need to use URLSearchParams (since we stored the items in the 'search' property)
    const queryParams = new URLSearchParams(location.search);
    const itemsArrayId = queryParams.get("items").split(',');
    const totalCost = queryParams.get("totalCost");
    console.log('total cost from cehckout: ', totalCost);

    const [formData, setFormData] = useState({
        email: '',
        payment: '',
    });

    const { email, cardNumber, cardExpires, cardCVC, firstName, lastName, streetAddress, aptNumOptional, city, state, zipCode } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('name: ', name, 'value: ', value)
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    const autofill = (e) => {
        e.preventDefault();
        setFormData({
            email: 'frank@frank.com',
            cardExpires: '3/25',
            cardNumber: 123456789101234,
            cardCVC: 123,
            firstName: 'Jenny',
            lastName: 'Smith',
            streetAddress: '1234 SomeStreet Ave',
            city: 'San Francisco',
            state: 'CA',
            zipCode: 98765
        })
    }



    return (
        <>
            <NavbarApp isCheckout={true} />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <h1>
                                Checkout
                            </h1>
                        </Col>
                    </Row>


                    <FormGroup>
                        <Row>
                            <Col>

                                <h3>
                                    Enter email address.
                                </h3>
                                <Label for="email">Email:</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    required
                                    onChange={handleInputChange}
                                />
                                <h5>
                                    Please do NOT put in your actual email. This is just a fictional site. Otherwise, the email is used for sending the receipt and the template (though the template should also be available in the Orders section after purchase).
                                </h5>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>

                        <Row>
                            <Col style={{ marginTop: '50px' }}>
                                <h3>
                                    Enter Payment Information.
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs='12'>
                                <Label for="cardNumber">Card Number:</Label>
                                <Input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={cardNumber}
                                    placeholder='1234-5678-9101-2345'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='2'>
                                <Label for="cardNumber">Expires</Label>
                                <Input
                                    type="text"
                                    id="cardExpires"
                                    name="cardExpires"
                                    value={cardExpires}
                                    placeholder='3/25'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='2'>
                                <Label for="cardCVC">CVC</Label>
                                <Input
                                    type="text"
                                    id="cardCVC"
                                    name="cardCVC"
                                    value={cardCVC}
                                    placeholder='123'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{ marginTop: '25px' }}>
                                <h4>Billing Address</h4>
                            </Col>
                        </Row>

                        <Row>
                            <Col md='6'>
                                <Label for="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    placeholder='Jenny'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='6'>
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    placeholder='Smith'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xs='12'>
                                <Label for="streetAddress">Street Address</Label>
                                <Input
                                    type="text"
                                    id="streetAddress"
                                    name="streetAddress"
                                    value={streetAddress}
                                    placeholder='1234 SomeStreet Ave'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='3'>
                                <Label for="aptNumOptional">Apt., Ste., Bldg (Optional)</Label>
                                <Input
                                    type="text"
                                    id="aptNumOptional"
                                    name="aptNumOptional"
                                    value={aptNumOptional}
                                    placeholder='Apt 106'
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='5'>
                                <Label for="city">City</Label>
                                <Input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={city}
                                    placeholder='San Francisco'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='2'>
                                <Label for="state">State</Label>
                                <Input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={state}
                                    placeholder='CA'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='2'>
                                <Label for="zipCode">Zip Code</Label>
                                <Input
                                    type="text"
                                    id="stazipCodete"
                                    name="zipCode"
                                    value={zipCode}
                                    placeholder='98765'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5>
                                    Please do NOT put in actual card information. This is just a fictional site. For the checkout to work, please click the 'autofill' button below to auto-populate the info that will allow payment.
                                </h5>
                                <Button onClick={autofill}>Auto-fill</Button>
                            </Col>
                        </Row>
                    </FormGroup>

                    <Row>
                        <Col style={{ marginTop: '50px' }}>
                            <h3>
                                Final Review of Products.
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {itemsArrayId.length > 0 &&
                                itemsArrayId.map((arr, idx) => (
                                    <CartItemCheckout
                                        key={idx}
                                        productId={arr}
                                    />
                                ))
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>Total Cost: ${Number(totalCost).toFixed(2)}</h1>
                        </Col>
                    </Row>
                    <Button color="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Checkout;