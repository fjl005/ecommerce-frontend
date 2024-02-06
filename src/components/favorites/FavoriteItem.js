import { useState, useEffect } from "react";
import ProductSummaryView from "../products/ProductSummaryView";
import { Container, Row, Col } from "reactstrap";
import { useProductSearchContext } from "../../contexts/ProductSearchContext";

const FavoriteItem = ({ productId, setFavoritesLoadingOverlay }) => {

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
                    setFavoritesLoadingOverlay={setFavoritesLoadingOverlay}
                />
            )}
        </Container>
    )
}

export default FavoriteItem