import NavbarApp from "../components/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
    const [numItems, setNumItems] = useState(0);
    const [numItemsArray, setNumItemsArray] = useState([]);

    useEffect(() => {
        // Create an array of length 'numItems'. The first argument is an object with a length property. The second argument is a mapping function; the first argument of that is a placeholder for the value of each element, which technically doesn't exist yet so it's really undefined. The second parameter is the index. Then, the mapping function will generate the numbers for each index of the array. We don't really care about these values; we just need the length of this array to match numItems so we can map over it in JSX.
        const newArray = Array.from({ length: numItems }, (_, index) => index);
        setNumItemsArray(newArray);
        console.log(newArray);
    }, [numItems]);

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

            {numItems && numItemsArray.map((arr, idx) => (
                <CartItem key={idx} />
            ))}

            <Container style={{ marginTop: '30px' }}>
                <Row>
                    <Col>
                        <h1>Items saved for later</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart