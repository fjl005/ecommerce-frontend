import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from '../components/navbar/NavbarApp';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Products from "../components/products/Products";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";

const HomePage = () => {
    /* Remember that for object destructuring, the ({username}) for the props is essentially:

    function(props) {
        const username = props.username
    }

     */


    return (
        <>
            <NavbarApp />
            <Container>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h1>Home Page</h1>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Products />
        </>
    )
}

export default HomePage;