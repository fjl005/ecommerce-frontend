import { Container, Row, Col, } from "reactstrap";
import { useLoginContext } from "../../contexts/LoginContext";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";
import PostProductForm from "../../components/admin/PostProductForm";
import { PRODUCT_ASPECT } from "../../components/admin/productAspectFormat";
import { useEffect } from "react";
import { usePostProductContext } from "../../contexts/PostProductContext";

const PostProductPage = () => {
    const { admin } = useLoginContext();
    const { setNewlyUploadedImagesFiles, setNewlyUploadedImagesURLs, setImageUploadNum, setExistingImagesURLs } = usePostProductContext();

    const formikInitial = {
        [PRODUCT_ASPECT.productName.short]: '',
        [PRODUCT_ASPECT.productPrice.short]: '',
        [PRODUCT_ASPECT.productType.short]: '',
        [PRODUCT_ASPECT.productDescription.short]: '',
    };

    useEffect(() => {
        setNewlyUploadedImagesFiles([]);
        setNewlyUploadedImagesURLs([]);
        setImageUploadNum(0);
        setExistingImagesURLs([]);
    }, []);

    return (
        <>
            {admin ? (
                <>
                    <NavbarAdmin currentPage={NAV_TITLE_MATCH.addproduct} />
                    <Container>
                        <Row>
                            <Col>
                                <h1 className='h1-admin'>Add New Product</h1>
                            </Col>
                        </Row>

                        <PostProductForm preExistingProduct={false} formikInitial={formikInitial} />

                    </Container>
                </>
            ) : (
                <Container>
                    <Row>
                        <Col>
                            <h1>You are not the admin. You cannot access this page.</h1>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default PostProductPage;