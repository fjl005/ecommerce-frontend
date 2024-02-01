import NavbarAdmin from "../navbar/NavbarAdmin";
import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";

const ProductSubmitted = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [productType, setProductType] = useState('');
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [itemsLength, setItemsLength] = useState([]);
    const [productId, setProductId] = useState('');


    useEffect(() => {
        // Get the query parameters from the URL
        const queryParams = new URLSearchParams(window.location.search);

        // Access the data using the get method
        setName(queryParams.get('name'));
        setPrice(queryParams.get('price'));
        setDescription(queryParams.get('description'));
        setProductType(queryParams.get('productType'));
        setThumbnailURL(queryParams.get('thumbnailURL'));
        setProductId(queryParams.get('productId'));
        setItemsLength(queryParams.get('itemsLength'));


    }, []);

    return (

        <>
            <NavbarAdmin />
            <Container>
                <Row>
                    <Col>
                        {itemsLength > 0 ? (
                            <h1>{itemsLength} products have been updated!</h1>
                        ) : productId && productId !== "undefined" ? (
                            <h1>Your product has been updated!</h1>
                        ) : (
                            <h1>Your product has been submitted!</h1>
                        )}
                    </Col>
                </Row>
            </Container>

            <Container className='cart-container' style={{ textAlign: 'center' }}>
                <Row>
                    <Col>
                        <h2>{name}</h2>
                        <h4>${price}</h4>
                        {thumbnailURL && (
                            <img src={thumbnailURL} style={{ width: '60%' }} />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: 'rgb(240, 240, 240)', width: '60%', margin: '20px auto 0px auto' }}>
                            <h4>{productType}</h4>
                            <p>{description}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductSubmitted;