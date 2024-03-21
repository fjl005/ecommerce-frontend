import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLoginContext } from '../../contexts/LoginContext';
import { PRODUCT_ASPECT } from '../../components/admin/productAspectFormat';
import { NAV_TITLE_MATCH } from '../../components/navbar/navbarPageTitles';
import { Container, Row, Col } from 'reactstrap';
import { axiosWithAuth } from '../../components/miscellaneous/axios';
import PostProductForm from '../../components/admin/PostProductForm';
import NavbarAdmin from '../../components/navbar/NavbarAdmin';
import { usePostProductContext } from '../../contexts/PostProductContext';

const EditProductsPage = () => {
    const { admin } = useLoginContext();
    const { setExistingImagesURLs, setNewlyUploadedImagesFiles, setNewlyUploadedImagesURLs } = usePostProductContext();
    const { productId } = useParams();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemsStr = searchParams.get('items');
    const itemsSelectedIdArr = JSON.parse(itemsStr);

    const [formikInitial, setFormikInitial] = useState({
        [PRODUCT_ASPECT.productName.short]: '',
        [PRODUCT_ASPECT.productPrice.short]: '',
        [PRODUCT_ASPECT.productType.short]: '',
        [PRODUCT_ASPECT.productDescription.short]: '',
    });

    const [originalImagesData, setOriginalImagesData] = useState([]);

    useEffect(() => {
        setNewlyUploadedImagesFiles([]);
        setNewlyUploadedImagesURLs([]);

        const fetchProduct = async (id) => {
            try {
                const response = await axiosWithAuth.get(`/products/${id}`);
                const data = response.data;
                setOriginalImagesData(data.pictures);

                setFormikInitial({
                    [PRODUCT_ASPECT.productName.short]: data.productName,
                    [PRODUCT_ASPECT.productPrice.short]: data.price,
                    [PRODUCT_ASPECT.productType.short]: data.productType,
                    [PRODUCT_ASPECT.productDescription.short]: data.description,
                });

                const fetchedImgURLs = [];
                if (data.pictures && data.pictures.length > 0) {
                    for (let imgObj of data.pictures) {
                        fetchedImgURLs.push(imgObj.url);
                    }
                }

                setExistingImagesURLs(fetchedImgURLs);

            } catch (error) { console.log('error in fetch product in PostProduct.js: ', error); }
        };

        if (productId) {
            fetchProduct(productId);
        } else if (itemsSelectedIdArr) {
            fetchProduct(itemsSelectedIdArr[0]);
        }
    }, []);

    return (
        <>
            {admin ? (
                <>
                    <NavbarAdmin currentPage={NAV_TITLE_MATCH.editproducts} />
                    <Container>
                        <Row>
                            <Col>
                                {itemsSelectedIdArr ? (
                                    <h1 className='h1-admin'>Update {itemsSelectedIdArr.length} listings</h1>
                                ) :
                                    productId ? (
                                        <h1 className='h1-admin'>Update Existing Product</h1>
                                    ) : (
                                        <h1 className='h1-admin'>Product not found</h1>
                                    )}
                            </Col>
                        </Row>

                        <PostProductForm
                            preExistingProduct={true}
                            formikInitial={formikInitial}
                            productId={productId}
                            itemsSelectedIdArr={itemsSelectedIdArr}
                            originalImagesData={originalImagesData}
                        />
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
    );
};

export default EditProductsPage;