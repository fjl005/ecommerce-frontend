import { useState, useEffect } from 'react'
import NavbarApp from '../components/navbar/NavbarApp';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import CartItemMDB from '../components/cart/CartItemMDB';
import CartItemCheckout from '../components/cart/CartItemCheckout';
import axios from 'axios';
import { useCartContext } from '../components/cart/CartContext';
import { useLoginContext } from '../components/login/LoginContext';
import { axiosWithAuth } from '../components/miscellaneous/axiosWithAuth';


const Checkout = () => {
    const { totalCost, cartItemsArrayId, fetchCart, fetchSaved, determineTotalCost, cartLength } = useCartContext();
    const { checkUser } = useLoginContext();

    const [formData, setFormData] = useState({});

    const {
        email,
        cardNumber,
        cardExpiresMonth,
        cardExpiresYear,
        cardCVC,
        firstName,
        lastName,
        streetAddress,
        aptNumOptional,
        city,
        state,
        zipCode
    } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('name: ', name, 'value: ', value)
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const formDataWithTotalCost = { ...formData, totalCost: totalCost }
            const response = await axiosWithAuth.post('/products/verifyCard', formDataWithTotalCost, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.data == 'All card information matched') {
                window.location.href = `/ordercompleted`;
            }

        } catch (error) {
            console.log('error when submitting: ', error);
            if (error.response.data == "Some card information incorrect") {
                alert('There is something incorrect with your payment / billing information. Please fix and try again.');
            }
        }
    };

    const autofill = (e) => {
        e.preventDefault();
        setFormData({
            email: 'frank@frank.com',
            cardExpiresMonth: 3,
            cardExpiresYear: 2025,
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

    const cardExpMonthArray = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ]

    const cardExpYearArray = [
        2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032
    ]

    const stateAbbreviations = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    useEffect(() => {
        checkUser();
        fetchCart();
        fetchSaved();
    }, []);

    useEffect(() => {
        determineTotalCost();
    }, [cartLength]);


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
                    <Row>
                        <Col style={{ marginBottom: '10px' }}>
                            <p style={{ marginBottom: '0px' }}>If this becomes a legitimate site, then I would implement actual payment verification. However, because I am not running this with a secure connection, I do not want ANY payment or identification information to be sent.</p>
                            <span>With that said, for the checkout to work, please click the autofill button here: </span>
                            <Button onClick={autofill} className='bg-primary'>Auto-fill</Button>
                        </Col>
                    </Row>


                    <FormGroup>
                        <Row>
                            <Col xs='1' style={{ maxWidth: '75px' }}>
                                <h3>
                                    1
                                </h3>
                            </Col>
                            <Col xs='11'>
                                <h3>
                                    Enter Email Address.
                                </h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs='1' style={{ maxWidth: '75px' }}></Col>
                            <Col xs='11'>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    required
                                    onChange={handleInputChange}
                                />
                                <h5 style={{ marginBottom: '0px' }}>
                                    Please do NOT put in your actual email. This is just a fictional site. Otherwise, the email is used for sending the receipt and the template (though the template should also be available in the Orders section after purchase).
                                </h5>
                            </Col>
                        </Row>
                    </FormGroup>

                    <Row style={{ marginBottom: '10px' }}>
                        <Col>
                            <hr style={{ color: 'black', backgroundColor: 'black', height: 2, }} />
                        </Col>
                    </Row>

                    <FormGroup>
                        <Row>
                            <Col xs='1' style={{ maxWidth: '75px' }}>
                                <h3>
                                    2
                                </h3>
                            </Col>
                            <Col xs='11'>
                                <h3>
                                    Enter Payment Information.
                                </h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs='1' style={{ maxWidth: '75px' }}></Col>
                            <Col xs='5'>
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
                            <Col xs='2'>
                                <Label for="cardExpiresMonth">Expires (Month)</Label>
                                <Input
                                    type="select"
                                    id="cardExpiresMonth"
                                    name="cardExpiresMonth"
                                    value={cardExpiresMonth}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Select Month --</option>
                                    {cardExpMonthArray.map((month, idx) => (
                                        <option key={idx} value={month}>{month}</option>
                                    ))}
                                </Input>
                            </Col>
                            <Col xs='2'>
                                <Label for="cardExpiresYear">Expires (Year)</Label>

                                <Input
                                    type="select"
                                    id="cardExpiresYear"
                                    name="cardExpiresYear"
                                    value={cardExpiresYear}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Select Year --</option>
                                    {cardExpYearArray.map((year, idx) => (
                                        <option key={idx} value={year}>{year}</option>
                                    ))}
                                </Input>

                            </Col>
                            <Col xs='2'>
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
                            <Col xs='1' style={{ maxWidth: '75px' }}></Col>
                            <Col xs='11'>
                                <h5>
                                    Please do NOT put in actual card information. This is just a fictional site. For the checkout to work, please click the 'autofill' button below to auto-populate the info that will allow payment.
                                </h5>
                            </Col>
                        </Row>
                    </FormGroup>

                    <Row style={{ marginBottom: '10px' }}>
                        <Col>
                            <hr style={{ color: 'black', backgroundColor: 'black', height: 2, }} />
                        </Col>
                    </Row>

                    <FormGroup>
                        <Row>
                            <Col xs='1' style={{ maxWidth: '75px' }}>
                                <h3>
                                    3
                                </h3>
                            </Col>
                            <Col xs='11'>
                                <h3>
                                    Enter Billing Address.
                                </h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs='1' style={{ maxWidth: '75px' }}></Col>
                            <Col md='5'>
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
                            <Col xs='1' style={{ maxWidth: '75px' }}></Col>
                            <Col md='7'>
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
                            <Col md='4'>
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
                            <Col xs='1' style={{ maxWidth: '75px' }}></Col>
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
                            <Col md='3'>
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
                            <Col md='3'>
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
                            <Col xs='1' style={{ maxWidth: '75px' }}></Col>
                            <Col xs='11'>
                                <h5>
                                    Please do NOT put in actual card information. This is just a fictional site. For the checkout to work, please click the 'autofill' button below to auto-populate the info that will allow payment.
                                </h5>
                            </Col>
                        </Row>
                    </FormGroup>

                    <Row style={{ marginBottom: '10px' }}>
                        <Col>
                            <hr style={{ color: 'black', backgroundColor: 'black', height: 4, }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs='1' style={{ maxWidth: '75px' }}>
                            <h3>4</h3>
                        </Col>
                        <Col xs='11'>
                            <h3>
                                Final Review of Products
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='1' style={{ maxWidth: '75px' }}></Col>
                        <Col>
                            {cartItemsArrayId.length > 0 &&
                                cartItemsArrayId.map((arr, idx) => (
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
                            <h1>Total Cost: ${totalCost.toFixed(2)}</h1>
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