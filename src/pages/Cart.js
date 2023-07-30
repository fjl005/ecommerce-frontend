import NavbarApp from "../components/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState } from "react";

const Cart = () => {
    const [numItems, setNumItems] = useState(0);

    return (
        <>
            <NavbarApp cartNumber={numItems} />
            <Container>
                <Row>
                    <Col>
                        {numItems === 0 ? (
                            <h1>Your cart is empty</h1>
                        ) : (
                            <h1>{numItems} in your cart.</h1>
                        )}

                        <Button onClick={() => setNumItems(numItems + 1)}>+1</Button>

                        {numItems > 0 && (
                            <Button onClick={() => setNumItems(numItems - 1)}>-1</Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart