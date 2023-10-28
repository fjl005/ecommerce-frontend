import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from 'react';
import { axiosWithAuth } from "../miscellaneous/axiosWithAuth";
import ProductChecklistView from "../products/ProductChecklistView";


const CartItem = ({ productId, isSaved, inCartJs }) => {

    const [productData, setProductData] = useState({});

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axiosWithAuth.get(`/products/${productId}`);
            const data = response.data;
            setProductData(data);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <Container className='cart-container'>
            <ProductChecklistView
                productItem={productData}
                inCartJs={inCartJs}
                isSaved={isSaved}
            />
        </Container>
    )
}

export default CartItem;