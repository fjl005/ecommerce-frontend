import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from 'react';
import ProductSummaryView from "../summaryview/ProductSummaryView";
import { useProductSearchContext } from "../../contexts/ProductSearchContext";

const CartItem = ({ productId, isSaved, inCartJs }) => {

    const [productData, setProductData] = useState({});
    const { fetchProduct } = useProductSearchContext();

    useEffect(() => {
        fetchProduct(productId, setProductData, null, `/cart/${productId}`);
    }, []);

    return (
        <Container className='cart-container'>
            {productData && productData.name === 'Product Deleted' ? (
                <Row>
                    <Col>
                        <h3 className='text-center'>Product Deleted</h3>
                    </Col>
                </Row>
            ) : (
                <ProductSummaryView
                    productItem={productData}
                    inCartJs={inCartJs}
                    isSaved={isSaved}
                />
            )}
        </Container>
    )
}

export default CartItem;