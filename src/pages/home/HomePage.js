import { Col, Container, Row } from 'reactstrap';
import { useParams, useNavigate } from "react-router-dom";
import NavbarApp from '../../components/navbar/NavbarApp';
import Products from "../../components/products/Products";
import welcomeBanner from '../../img/welcomeBanner.png';
import { useState } from 'react';
import { useProductContext } from '../../components/products/ProductContext';

const HomePage = () => {
    const { searchTerm } = useParams();
    const { setSearchQuery } = useProductContext();
    const navigate = useNavigate();

    return (
        <>
            <NavbarApp />
            <img
                src={welcomeBanner}
                alt={'Fetsy page banner'}
                style={{
                    width: '100%',
                    height: 'auto'
                }}
            />

            {searchTerm && (
                <Container className='text-center'>
                    <Row>
                        <Col>
                            <h4>Search Term: {searchTerm}</h4>
                            <span
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    setSearchQuery('');
                                    navigate('/');
                                }}
                            >Click to clear</span>
                        </Col>
                    </Row>
                </Container>
            )}
            <Products />
        </>
    )
}

export default HomePage;