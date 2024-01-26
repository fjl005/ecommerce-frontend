import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import NavbarApp from '../../components/navbar/NavbarApp';
import Products from "../../components/products/Products";
import welcomeBanner from '../../img/welcomeBanner.png';
import { useProductContext } from '../../components/products/ProductContext';

const HomePage = () => {
    const { searchQuery, setSearchQuery } = useProductContext();
    const navigate = useNavigate();

    return (
        <>
            <NavbarApp />
            <img
                src={welcomeBanner}
                alt={'Fetsy page banner'}
                className='w-100'
            />

            {searchQuery && (
                <Container className='text-center'>
                    <Row>
                        <Col>
                            <h4>Search Term: {searchQuery}</h4>
                            <span
                                className='blue-hyperlink-text'
                                onClick={() => {
                                    setSearchQuery('');
                                    navigate('/');
                                }}
                            >
                                Click to clear
                            </span>
                        </Col>
                    </Row>
                </Container>
            )}

            <Products />
        </>
    )
}

export default HomePage;