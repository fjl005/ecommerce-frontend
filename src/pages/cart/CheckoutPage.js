import { useState, useEffect } from 'react'
import NavbarApp from '../../components/navbar/NavbarApp';
import { Container, Row, Col } from 'reactstrap';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import CartItem from '../../components/cart/CartItem';
import { useCartContext } from '../../contexts/CartContext';
import { useLoginContext } from '../../contexts/LoginContext';
import { axiosWithAuth } from '../../components/miscellaneous/axios';
import SpinningIcon from '../../components/miscellaneous/SpinningIcon';
import { useSavedItemContext } from '../../contexts/SavedItemContext';
import CheckoutPageBreak from '../../components/cart/CheckoutPageBreak';


const CheckoutPage = () => {
    const {
        totalCost,
        cartItemsArrayId,
        fetchCart,
        determineTotalCost,
        loadingCost,
        cartLength,
        setCartLength
    } = useCartContext();

    const { fetchSaved } = useSavedItemContext();
    const { checkUser } = useLoginContext();

    const defaultFormData = {
        email: '',
        cardNumber: '',
        cardExpiresMonth: '',
        cardExpiresYear: '',
        cardCVC: '',
        firstName: '',
        lastName: '',
        streetAddress: '',
        aptNumOptional: '',
        city: '',
        state: '',
        zipCode: '',
    }

    const [formData, setFormData] = useState(defaultFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
            if (response.data.message == 'All card information matched') {
                setCartLength(0);
                window.location.href = `/ordercompleted/${response.data.orderId}`;
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
            ...formData,
            email: 'frank@frank.com',
            cardNumber: 123456789101234,
            cardExpiresMonth: 3,
            cardExpiresYear: 2025,
            cardCVC: 123,
            firstName: 'Jenny',
            lastName: 'Smith',
            streetAddress: '1234 SomeStreet Ave',
            aptNumOptional: 'Apt. 311',
            city: 'San Francisco',
            state: 'CA',
            zipCode: 98765,
        });
    };

    const cardExpMonthArray = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];

    const cardExpYearArray = [
        2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032
    ];

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
                        <Col style={{ marginBottom: '2rem' }}>
                            <h5>
                                Please do NOT enter actual payment information. For the checkout to work, please click the autofill button here:
                            </h5>
                            <Button onClick={(event) => autofill(event)} className='bg-primary'>
                                Auto-fill
                            </Button>
                            <Button onClick={() => setFormData(defaultFormData)} className='ml-3'>
                                Clear
                            </Button>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Row className='mt-3'>
                            <Col xs='1' className='checkout-num-width'>
                                <h3 className='checkout-step-number'>1</h3>
                            </Col>
                            <Col xs='11'>
                                <h3>Enter Email Address.</h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs='1' className='checkout-num-width'></Col>
                            <Col xs='11'>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </FormGroup>

                    <CheckoutPageBreak />

                    <FormGroup>
                        <Row>
                            <Col xs='1' className='checkout-num-width'>
                                <h3 className='checkout-step-number'> 2</h3>
                            </Col>
                            <Col xs='11'>
                                <h3>Enter Payment Information.</h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs='1' className='checkout-num-width'></Col>
                            <Col xs='12' md='5' className='mb-3'>
                                <Label for="cardNumber">Card Number (no dashes):</Label>
                                <Input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    placeholder='1234567891012345'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xs='3' md='2' className='mb-3'>
                                <Label for="cardExpiresMonth">Expires (Month)</Label>
                                <Input
                                    type="select"
                                    id="cardExpiresMonth"
                                    name="cardExpiresMonth"
                                    value={formData.cardExpiresMonth}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Select Month --</option>
                                    {cardExpMonthArray.map((month, idx) => (
                                        <option key={idx} value={month}>{month}</option>
                                    ))}
                                </Input>
                            </Col>
                            <Col xs='3' md='2' className='mb-3'>
                                <Label for="cardExpiresYear">Expires (Year)</Label>
                                <Input
                                    type="select"
                                    id="cardExpiresYear"
                                    name="cardExpiresYear"
                                    value={formData.cardExpiresYear}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Select Year --</option>
                                    {cardExpYearArray.map((year, idx) => (
                                        <option key={idx} value={year}>{year}</option>
                                    ))}
                                </Input>

                            </Col>
                            <Col xs='3' md='2' className='mb-3 d-flex flex-column justify-content-between'>
                                <Label for="cardCVC">CVC</Label>
                                <Input
                                    type="text"
                                    id="cardCVC"
                                    name="cardCVC"
                                    value={formData.cardCVC}
                                    placeholder='123'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </FormGroup>

                    <CheckoutPageBreak />

                    <FormGroup>
                        <Row>
                            <Col xs='1' className='checkout-num-width'>
                                <h3 className='checkout-step-number'>3</h3>
                            </Col>
                            <Col xs='11'>
                                <h3>Enter Billing Address.</h3>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs='1' className='checkout-num-width mb-3'></Col>
                            <Col md='5' className='mb-3'>
                                <Label for="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    placeholder='Jenny'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='6' className='mb-3'>
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    placeholder='Smith'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xs='1' className='checkout-num-width'></Col>
                            <Col md='7' className='mb-3'>
                                <Label for="streetAddress">Street Address</Label>
                                <Input
                                    type="text"
                                    id="streetAddress"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    placeholder='1234 SomeStreet Ave'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='4' className='mb-3'>
                                <Label for="aptNumOptional">Apt., Ste., Bldg (Optional)</Label>
                                <Input
                                    type="text"
                                    id="aptNumOptional"
                                    name="aptNumOptional"
                                    value={formData.aptNumOptional}
                                    placeholder='Apt 106'
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col xs='1' className='checkout-num-width'></Col>
                            <Col md='5' className='mb-3'>
                                <Label for="city">City</Label>
                                <Input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    placeholder='San Francisco'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col md='3' className='mb-3'>
                                <Label for="state">State</Label>
                                <Input
                                    type="select"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    required
                                    onChange={handleInputChange}
                                >
                                    <option value="">-- Select State --</option>
                                    {stateAbbreviations.map((state, idx) => (
                                        <option key={idx} value={state}>{state}</option>
                                    ))}
                                </Input>


                            </Col>
                            <Col md='3' className='mb-3'>
                                <Label for="zipCode">Zip Code</Label>
                                <Input
                                    type="text"
                                    id="stazipCodete"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    placeholder='98765'
                                    required
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Row>
                    </FormGroup>

                    <CheckoutPageBreak />

                    <Row>
                        <Col xs='1' className='checkout-num-width'>
                            <h3 className='checkout-step-number'>4</h3>
                        </Col>
                        <Col xs='11'>
                            <h3>Final Review of Products</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs='1' className='checkout-num-width'></Col>
                        <Col>
                            {cartItemsArrayId.length > 0 &&
                                cartItemsArrayId.map((productId, idx) => (
                                    <CartItem
                                        key={idx}
                                        productId={productId}
                                    />
                                ))
                            }
                        </Col>
                    </Row>

                    <CheckoutPageBreak />

                    <Row>
                        <Col>
                            <h1>
                                Total Cost:
                                {loadingCost ? (
                                    <div className='ml-3 d-inline-block'>
                                        <SpinningIcon size='1x' />
                                    </div>
                                ) : (
                                    <span> ${totalCost.toFixed(2)}</span>
                                )}
                            </h1>
                        </Col>
                    </Row>

                    <h5 style={{ color: 'red' }}>
                        By clicking submit, you acknowledge that you did NOT put in actual card information. Because this shop is not live, there is no secure network connection to protect your data. Additionally, the checkout will not work unless the 'autofill' is selected (see top of page for this button).
                    </h5>

                    <Button color="primary" type="submit">
                        Submit
                    </Button>


                </Form>
            </Container>
        </>
    )
}

export default CheckoutPage;