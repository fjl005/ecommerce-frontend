import { useState } from 'react'
import NavbarApp from '../components/miscellaneous/NavbarApp';
import { Container, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


const Checkout = () => {
    const [formData, setFormData] = useState({
        email: '',
        payment: '',
    });

    const { email, payment } = formData;

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
                                    Choose an email address.
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
                                    We will email you the template and receipt here.
                                </h5>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>

                        <Row>
                            <Col>

                                <h3>
                                    Choose a payment method.
                                </h3>
                                <Label for="payment">Payment:</Label>
                                <Input
                                    type="text"
                                    id="payment"
                                    name="payment"
                                    value={payment}
                                    required
                                    onChange={handleInputChange}
                                />
                                <h5>
                                    Please do NOT put in actual card information. This is just a fictional site. For the checkout to work, please click this button to auto-populate the info that will allow payment.
                                </h5>
                                <Button>Auto-fill</Button>
                            </Col>
                        </Row>
                    </FormGroup>

                    <Row>
                        <Col>
                            <h3>
                                Final Review of products.
                            </h3>
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