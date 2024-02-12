import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Button,
} from "reactstrap";
import { useEffect, useState } from "react";
import {
    Formik,
    Field,
    Form,
    ErrorMessage
} from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from "../../components/miscellaneous/axios";
import { useLoginContext } from "../../contexts/LoginContext";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import ImageUpload from "../../components/admin/ImageUpload";
import NavbarAdmin from "../../components/navbar/NavbarAdmin";
import { NAV_TITLE_MATCH } from "../../components/navbar/navbarPageTitles";


const PostProductPage = () => {

    const { admin } = useLoginContext();
    const { productId } = useParams();

    // Access info from URL of items that may have been passed (if editing products)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemsStr = searchParams.get('items');
    const itemsSelectedIdArr = JSON.parse(itemsStr);

    const [fileErrorMsg, setFileErrorMsg] = useState('');
    const [newlyUploadedImageFiles, setNewlyUploadedImageFiles] = useState([]);
    const [newlyUploadedImageURLs, setNewlyUploadedImageURLs] = useState([]);
    const [existingImagesURLs, setExistingImagesURLs] = useState([]);
    const [imageUploadNum, setImageUploadNum] = useState(0);
    const [fetchedImgData, setFetchedImgData] = useState([]);

    // States for the form
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [productType, setProductType] = useState('');
    const [description, setDescription] = useState('');

    // When images are uploaded, run handleImageChange
    const handleImageChange = async (event) => {
        const maxImageCount = 10;
        const files = event.target.files
        const filesArray = Array.from(files);

        if (filesArray.length + newlyUploadedImageFiles.length + existingImagesURLs.length > maxImageCount) {
            setFileErrorMsg('You can only have a maximum of 10 images total.');
            return;
        }

        // updatedNewImgURLs is a clone of newlyUploadedImageURLs. Since we want to push URLs into the array, we will do so outside of state.
        let updatedNewImgURLs = [...newlyUploadedImageURLs];

        for (let i = 0; i < filesArray.length; i++) {
            const url = URL.createObjectURL(filesArray[i]);
            updatedNewImgURLs.push(url);
        }

        setNewlyUploadedImageFiles([...newlyUploadedImageFiles, ...filesArray]);
        setNewlyUploadedImageURLs(updatedNewImgURLs);
        setFileErrorMsg('');
    };

    const deleteImgUpload = (urlToDelete, idx, existing) => {
        if (existing) {
            const updatedURLs = existingImagesURLs.filter(imgUrl => imgUrl !== urlToDelete);
            setExistingImagesURLs(updatedURLs);
        } else {
            const updatedURLs = newlyUploadedImageURLs.filter(imgUrl => imgUrl !== urlToDelete);
            const updatedFiles = newlyUploadedImageFiles.filter((file, index) => idx !== index);

            setNewlyUploadedImageURLs(updatedURLs);
            setNewlyUploadedImageFiles(updatedFiles);
        }
    };


    const imgUpload = async (imageFiles, uploadNum, imgDataArray,) => {

        const uploadPromises = imageFiles.map(async (imageFile, index) => {
            const formDataImg = new FormData();
            formDataImg.append('file', imageFile);
            formDataImg.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

            const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formDataImg);
            const cloudinaryData = cloudinaryRes.data;

            const imgData = {
                url: cloudinaryData.secure_url,
                publicId: cloudinaryData.public_id,
                position: index,
            };

            imgDataArray.push(imgData);
            uploadNum++;
            setImageUploadNum(uploadNum);
        });

        await Promise.all(uploadPromises);
        imgDataArray.sort((a, b) => a.position - b.position);

        return imgDataArray.map(({ url, publicId }) => ({ url, publicId }));
    };


    // Form validation
    const validationSchema = Yup.object({
        productTitle: Yup.string().required('Title is required'),
        productPrice: Yup.number()
            .positive('Price must be positive')
            .max(9999.99, 'Price must be less than or equal to $9,999.99')
            .test(
                'is-decimal',
                'Price must have up to two decimal places',
                (value) => /^(\d*\.\d{1,2}|\d+)$/.test(value)
            ),
        productDescription: Yup.string().required('Description is required'),
        productType: Yup.string().required('Product Type is required').oneOf(['Digital Download', 'Physical Item'], 'Invalid Product Type'),
    });

    // Form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        const { productType, productTitle, productPrice, productDescription } = values;

        const uploadInfo = {
            name: productTitle,
            price: productPrice,
            description: productDescription,
            productType
        };

        let uploadNum = 0;
        const imgDataArray = [];
        const deletePublicIdArr = [];

        try {
            // First, check the server. Don't upload photos if the server is down.
            await axiosWithAuth.get('/cloudinary');

            // CASE ONE: posting a brand new product.
            if (!itemsSelectedIdArr && !productId) {
                if (newlyUploadedImageFiles.length > 0) {
                    try {
                        await imgUpload(newlyUploadedImageFiles, uploadNum, imgDataArray);
                    } catch (error) {
                        console.log('Error with Cloudinary:', error);
                    }
                }

                uploadInfo.pictures = imgDataArray;
                const response = await axiosWithAuth.post('/products', { uploadInfo });
                switchPage(response.data.product);
            }

            // Else, either itemsSelectedIdArr or productId exists, which means we will be updating an existing product.
            else {
                // Find images missing in existing imageURLs from original fetchedImgData; they will be deleted.
                let deleteImagesObj = [];
                for (let image of fetchedImgData) {
                    if (!existingImagesURLs.includes(image.url)) {
                        deleteImagesObj.push(image);
                    }
                }
                // If images should be deleted, first delete from Cloudinary via their public id.
                if (deleteImagesObj.length > 0) {
                    try {
                        const deletePromises = deleteImagesObj.map(async (image) => {
                            deletePublicIdArr.push(image.publicId);
                            await axiosWithAuth.delete(`/cloudinary/${image.publicId}`);
                        });
                        await Promise.all(deletePromises);
                        uploadInfo.deletePublicIdArr = deletePublicIdArr;
                    } catch (error) { console.log('Error deleting images:', error); }
                }
                // After existing images are deleted, upload any newly uploaded images to Cloudinary.
                if (newlyUploadedImageFiles.length > 0) {
                    const newImages = await imgUpload(newlyUploadedImageFiles, uploadNum, imgDataArray,);
                    uploadInfo.newImageData = newImages;
                }

                // Now, the images have been taken care of. Let's revisit the possible cases again.
                // CASE TWO: PUT operation for an existing SINGLE product.
                if (productId && !itemsSelectedIdArr) {
                    const response = await axiosWithAuth.put(`/products/${productId}`, {
                        uploadInfo
                    });
                    switchPage(response.data);
                }

                // SCENARIO THREE: PUT operation for updating existing MULTIPLE products
                else if (itemsSelectedIdArr && itemsSelectedIdArr.length > 0) {
                    const response = await axiosWithAuth.put(`/products/multiple/items`, {
                        itemsSelectedIdArr,
                        uploadInfo
                    });
                    switchPage(response.data);
                }
            }
        }
        catch (error) { console.log('Error in handleSubmit() in PostProduct.js: ', error); }
        finally { setSubmitting(false); }
    };


    // After form submission
    const switchPage = (data) => {
        let thumbnailURL = '';
        let itemsLength = 0;

        if (itemsSelectedIdArr && itemsSelectedIdArr.length > 0) {
            itemsLength = itemsSelectedIdArr.length;
        }

        if (data.pictures.length > 0) {
            thumbnailURL = data.pictures[0].url;
        }

        const dataToPass = {
            name: data.name,
            price: data.price,
            description: data.description,
            productType: data.productType,
            thumbnailURL,
            itemsLength,
            productId
        };

        const queryString = new URLSearchParams(dataToPass).toString();
        window.location.href = `/admin/addnewproduct/submitted?${queryString}`;
    };


    // Fetch Products if editing existing product(s)
    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        } else if (itemsSelectedIdArr) {
            fetchProduct(itemsSelectedIdArr[0]);
        }
    }, []);

    const fetchProduct = async (id) => {
        try {
            const response = await axiosWithAuth.get(`/products/${id}`);
            const data = response.data;
            setTitle(data.name);
            setPrice(data.price);
            setProductType(data.productType);
            setDescription(data.description);
            setFetchedImgData(data.pictures);

            const fetchedImgURLs = [];

            if (data.pictures && data.pictures.length > 0) {
                for (let imgObj of data.pictures) {
                    fetchedImgURLs.push(imgObj.url);
                }
            }
            setExistingImagesURLs(fetchedImgURLs);
        } catch (error) { console.log('error in fetch product in PostProduct.js: ', error); }
    };


    return (
        <>
            {admin ? (
                <>
                    <NavbarAdmin currentPage={NAV_TITLE_MATCH.addproduct} />
                    <Container>
                        <Row>
                            <Col>
                                {itemsSelectedIdArr ? (
                                    <h1 className='h1-admin'>Update {itemsSelectedIdArr.length} listings</h1>
                                ) :
                                    productId ? (
                                        <h1 className='h1-admin'>Update Existing Product</h1>
                                    ) : (
                                        <h1 className='h1-admin'>Add New Product</h1>
                                    )}
                            </Col>
                        </Row>
                        <Row>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    productType: productType,
                                    productTitle: title,
                                    productPrice: price,
                                    productDescription: description,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {/* This callback function disables the submit button when submitting. 'isSubmitting' is automatically provided by Formik. */}
                                {({ isSubmitting }) => (
                                    <Form className='post-product-form'>
                                        <Col>
                                            <Label
                                                for='product-title'
                                                className='post-product-admin-label'
                                            >
                                                <h4>Product Title</h4>
                                            </Label>

                                            <Field
                                                type='text'
                                                name='productTitle'
                                                id='product-title'
                                                as={Input}
                                            />
                                            <ErrorMessage
                                                name='productTitle'
                                                component='div'
                                                className='text-danger'
                                            />
                                        </Col>

                                        <Row>
                                            <Col xs='6'>
                                                <Label
                                                    for='product-price'
                                                    className='post-product-admin-label'
                                                >
                                                    <h4>Price</h4>
                                                </Label>

                                                <div className='d-flex align-items-center'>
                                                    <span style={{ fontSize: '1.5rem' }}>$</span>
                                                    <Field
                                                        type='text'
                                                        name='productPrice'
                                                        id='product-price'
                                                        as={Input}
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name='productPrice'
                                                    component='div'
                                                    className='text-danger'
                                                />
                                            </Col>

                                            <Col xs='6'>
                                                <Label
                                                    for='product-type'
                                                    className='post-product-admin-label'
                                                >
                                                    <h4>Product Type</h4>
                                                </Label>

                                                <Field
                                                    type='select'
                                                    name='productType'
                                                    id='product-type'
                                                    as={Input}
                                                >
                                                    <option value='' disabled>Select</option>
                                                    <option value='Digital Download'>Digital Download</option>
                                                    <option value='Physical Item'>Physical Item</option>
                                                </Field>
                                                <ErrorMessage
                                                    name='productType'
                                                    component='div'
                                                    className='text-danger'
                                                />
                                            </Col>
                                        </Row>

                                        <Col>
                                            <Label
                                                for='product-description'
                                                className='post-product-admin-label'
                                            >
                                                <h4>Product Description</h4>
                                            </Label>

                                            <Field
                                                type='textarea'
                                                name='productDescription'
                                                id='product-description'
                                                as={Input}
                                            />
                                            <ErrorMessage
                                                name='productDescription'
                                                component='div'
                                                className='text-danger'
                                            />
                                        </Col>

                                        <Col>
                                            {itemsSelectedIdArr ? (
                                                <h4>Currently, images cannot be updated when editing multiple products</h4>
                                            ) : (
                                                <>
                                                    <Label className='post-product-admin-label d-flex align-items-center'>
                                                        <h4 style={{ marginRight: '10px' }}>Images</h4>
                                                        {newlyUploadedImageFiles.length + existingImagesURLs.length < 10 && (
                                                            <>
                                                                <Button
                                                                    type='button'
                                                                    style={{ margin: '0px', padding: '0px', }}
                                                                >
                                                                    <Label
                                                                        htmlFor="img"
                                                                        style={{ cursor: 'pointer', padding: '5px', margin: '0px' }}
                                                                    >
                                                                        Choose Files
                                                                    </Label>
                                                                </Button>
                                                                <Input
                                                                    name='productImg'
                                                                    id='img'
                                                                    type='file'
                                                                    accept='image/*'
                                                                    multiple
                                                                    onChange={handleImageChange}
                                                                    style={{ fontSize: 0, display: 'none' }}
                                                                />
                                                            </>
                                                        )}
                                                        <p style={{ margin: '0px auto 0px 10px' }}>Recommended picture dimensions are 2000 x 2000 px.</p>
                                                    </Label>


                                                    <h5 style={{ margin: '0 0 0 10px', color: 'red' }}>
                                                        {fileErrorMsg}
                                                    </h5>

                                                    {(productId || (itemsSelectedIdArr && itemsSelectedIdArr.length > 0)) && (
                                                        <>
                                                            <h6>
                                                                Previously Uploaded:
                                                                {existingImagesURLs.length === 0 && (
                                                                    <span> None or all deleted.</span>
                                                                )}
                                                            </h6>

                                                            {existingImagesURLs && existingImagesURLs.length > 0 &&
                                                                existingImagesURLs.map((url, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className='image-upload-border-admin'
                                                                    >
                                                                        <ImageUpload
                                                                            url={url}
                                                                            idx={idx}
                                                                            existing={true}
                                                                            deleteImgUpload={deleteImgUpload}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            <h6 style={{ marginTop: '4rem' }}>Newly Uploaded:</h6>
                                                        </>
                                                    )}

                                                    {newlyUploadedImageURLs
                                                        && newlyUploadedImageURLs.length > 0 && (
                                                            newlyUploadedImageURLs.map((url, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className='image-upload-border-admin'
                                                                >
                                                                    <ImageUpload
                                                                        url={url}
                                                                        idx={idx}
                                                                        existing={false}
                                                                        deleteImgUpload={deleteImgUpload}
                                                                    />
                                                                </div>
                                                            ))
                                                        )
                                                    }

                                                    <h6>This product has {newlyUploadedImageFiles.length + existingImagesURLs.length} images (max. 10 allowed).</h6>
                                                </>
                                            )}
                                        </Col>

                                        <div
                                            className='d-flex align-items-center'
                                            style={{ marginTop: '3rem' }}
                                        >
                                            <Button
                                                type='submit'
                                                className='bg-primary mr-3'
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                            </Button>

                                            {isSubmitting &&
                                                <>
                                                    <SpinningIcon style={{ margin: '0 1.5rem' }} size='xl' />
                                                    <span className='ml-3'>
                                                        This may take a moment, and may take longer if you are uploading multiple images.
                                                    </span>
                                                    <span
                                                        style={{
                                                            color: 'blue',
                                                            fontWeight: 'bold',
                                                            margin: '0 1rem'
                                                        }}
                                                    >
                                                        Uploaded {imageUploadNum} of {newlyUploadedImageFiles.length} images.
                                                    </span>
                                                </>
                                            }
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Row>
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