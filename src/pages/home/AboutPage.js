import { Container, Row, Col } from "reactstrap"
import NavbarApp from "../../components/navbar/NavbarApp";
import GeneralFAQ from "../../components/about/GeneralFAQ";
import Technologies from "../../components/about/Technologies";
import { frontendTechnologies } from "../../components/about/frontendTech";
import { backendTechnologies } from "../../components/about/backendTech";

const AboutPage = () => {
    return (
        <>
            <NavbarApp currentPage='About' />
            <Container>
                <Row>
                    <Col>
                        <h1>About this Project</h1>
                        <GeneralFAQ />
                        <Technologies techType='Frontend' details={frontendTechnologies} />
                        <Technologies techType='Backend' details={backendTechnologies} />

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AboutPage;