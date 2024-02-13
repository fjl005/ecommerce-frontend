import { Container, Row, Col } from "reactstrap"
import NavbarApp from "../../components/navbar/NavbarApp";
import GeneralFAQ from "../../components/about/GeneralFAQ";
import Technologies from "../../components/about/Technologies";
import { frontendTechnologies } from "../../components/about/frontendTech";
import { backendTechnologies } from "../../components/about/backendTech";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";

const AboutPage = () => {
    return (
        <>
            <NavbarApp currentPage={NAV_TITLE_MATCH.about} />
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