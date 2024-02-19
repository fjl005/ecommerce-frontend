import { useState, useEffect } from "react";
import ProductSummaryView from "../summaryview/ProductSummaryView";
import { Container, Row, Col } from "reactstrap";
import { useProductSearchContext } from "../../contexts/ProductSearchContext";

const FavoriteItem = ({ productId }) => {

    const [favoriteItem, setFavoriteItem] = useState({});
    const { fetchProduct } = useProductSearchContext();

    useEffect(() => {
        fetchProduct(productId, setFavoriteItem, () => null, `/favorites/${productId}`);
    }, []);

    return (
        <Container className='cart-container'>
            {favoriteItem && favoriteItem.name === 'Product Deleted' ? (
                <Row>
                    <Col>
                        <h3 className='text-center'>Product Deleted</h3>
                    </Col>
                </Row>
            ) : (
                <ProductSummaryView
                    productItem={favoriteItem}
                    inFavoritesJs={true}
                />
            )}
        </Container>
    )
}

export default FavoriteItem