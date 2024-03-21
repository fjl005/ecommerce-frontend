import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import NavbarApp from '../../components/navbar/NavbarApp';
import welcomeBanner from '../../img/welcomeBanner.png';
import { useProductSearchContext } from '../../contexts/ProductSearchContext';
import ProductsHomePage from '../../components/products/ProductsHomePage';

const HomePage = () => {
    const { searchQuery, setSearchQuery } = useProductSearchContext();
    const navigate = useNavigate();

    return (
        <>
            <NavbarApp />
            <div className='d-flex justify-content-center'>
                <img
                    src={welcomeBanner}
                    alt='Fetsy page banner'
                    className='welcome-banner'
                />
            </div>


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

            <ProductsHomePage />
        </>
    )
}

export default HomePage;