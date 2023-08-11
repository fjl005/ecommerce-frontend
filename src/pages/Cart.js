import NavbarApp from "../components/NavbarApp";
import { Container, Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
    const [numItems, setNumItems] = useState(0);
    const [itemsArray, setItemsArray] = useState([]);
    const [numSaveItems, setNumSaveItems] = useState(0);
    const [saveItemsArray, setSaveItemsArray] = useState([]);

    useEffect(() => {
        // Create an array of length 'numItems'. The first argument is an object with a length property. The second argument is a mapping function; the first argument of that is a placeholder for the value of each element, which technically doesn't exist yet so it's really undefined. The second parameter is the index. Then, the mapping function will generate the numbers for each index of the array. We don't really care about these values; we just need the length of this array to match numItems so we can map over it in JSX.
        const newArray = Array.from({ length: numItems }, (_, index) => index);
        setItemsArray(newArray);
    }, [numItems]);

    const removeCartItem = (idx) => {
        const updatedArray = updateArray(itemsArray, idx)[1];
        setItemsArray(updatedArray);
        setNumItems(numItems - 1);
    };

    const removeSavedItem = (idx) => {
        const updatedArray = updateArray(saveItemsArray, idx)[1];
        setSaveItemsArray(updatedArray);
        setNumSaveItems(numSaveItems - 1);
    };

    // I was going to generalize the two remove item functions above, but it seems like it'd be more code. lmao

    // const removeItem = (sectionArray, idx, setArrayFxn, setNumFxn) => {
    //     const updatedArray = updateArray(sectionArray, idx)[1];
    //     setArrayFxn(updatedArray);
    //     setNumFxn(numItems - 1);
    // };

    const saveLaterCartItem = (idx) => {
        const [savedItem, updatedArray] = updateArray(itemsArray, idx);
        setSaveItemsArray([...saveItemsArray, savedItem]);
        setNumSaveItems(numSaveItems + 1);

        setItemsArray(updatedArray);
        setNumItems(numItems - 1);
    };

    const moveBackToCart = (idx) => {
        const [itemToMove, updatedArray] = updateArray(saveItemsArray, idx);
        setSaveItemsArray(updatedArray);
        setNumSaveItems(numSaveItems - 1);

        setItemsArray([...itemsArray, itemToMove]);
        setNumItems(numItems + 1);
    };

    const updateArray = (array, idx) => {
        const selectedItem = array.find((_, index) => index === idx);
        const updatedArray = array.filter((_, index) => index !== idx);
        return [selectedItem, updatedArray];
    };


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

            {numItems > 0 && itemsArray.map((arr, idx) => (
                <CartItem
                    key={idx}
                    position={idx}
                    removeCartItem={removeCartItem}
                    saveLaterCartItem={saveLaterCartItem}
                    isSaved={false}
                />
            ))}

            <Container style={{ marginTop: '150px' }}>
                <Row>
                    <Col>
                        <h1>Items saved for later</h1>
                        {numSaveItems > 0 ?
                            saveItemsArray.map((arr, idx) => (
                                <CartItem
                                    key={idx}
                                    position={idx}
                                    isSaved={true}
                                    removeSavedItem={removeSavedItem}
                                    moveBackToCart={moveBackToCart}
                                />
                            )) : (
                                <h3>None</h3>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cart