import { Container, Row, Col, Button } from "reactstrap";
import NavbarApp from '../components/navbar/NavbarApp';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Products from "../components/products/Products";
import { axiosWithAuth } from "../components/miscellaneous/axiosWithAuth";
import welcomeBanner from '../img/welcomeBanner.png';

const HomePage = () => {
    /* Remember that for object destructuring, the ({username}) for the props is essentially:

    function(props) {
        const username = props.username
    }

     */


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
            <Products />
        </>
    )
}

export default HomePage;