import { Col, Container, Row, FormGroup, Label, Input, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from "../../components/miscellaneous/axiosWithAuth";
import { useLoginContext } from "../../components/login/LoginContext";
import ProductSubmitted from "../../components/admin/ProductSubmitted";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SpinningIcon from "../../components/miscellaneous/SpinningIcon";
import ImageUpload from "../../components/admin/ImageUpload";

const PostProductPage = () => {

    const { admin } = useLoginContext();
    const { productId } = useParams();

    /* 
        -useLocation: allows us to access info about the current URL, including the query parameters.
        -location.search is a property of the location object that contains the query string portion of the URL (including the ?). 
        -URLSearchParams is a built-in JS class that allows you to work with query parameters
        -We are retrieving the value associated with the key 'items' from the query parameters
        -Then convert the JSON string into a JS array.
    */

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemStr = searchParams.get('items');
    const itemSelectedIdArr = JSON.parse(itemStr);


    // States regarding the files and images
    const [fileErrorMsg, setFileErrorMsg] = useState('');
    const [newlyUploadedImageFiles, setNewlyUploadedImageFiles] = useState([]);
    const [newlyUploadedImageURLs, setNewlyUploadedImageURLs] = useState([]);
    const [existingImagesURLs, setExistingImagesURLs] = useState([]);
    const [imageUploadNum, setImageUploadNum] = useState(0);


    // States for the form
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [productType, setProductType] = useState('');
    const [description, setDescription] = useState('');
    const [fetchedImgData, setFetchedImgData] = useState([]);


    // Image Functions

    // When images are uploaded, run handleImageChange
    const handleImageChange = (event) => {
        const maxImageCount = 10;
        const files = event.target.files
        const filesArray = Array.from(files);

        if (filesArray.length + newlyUploadedImageFiles.length + existingImagesURLs.length > maxImageCount) {
            setFileErrorMsg('You can only have a maximum of 10 images total.');
            return;
        }

        let newImageURLs = [...newlyUploadedImageURLs];

        for (let i = 0; i < filesArray.length; i++) {
            const file = filesArray[i];
            const url = URL.createObjectURL(file);
            newImageURLs.push(url);
        }

        setNewlyUploadedImageFiles([...newlyUploadedImageFiles, ...filesArray]);
        setNewlyUploadedImageURLs(newImageURLs);
        setFileErrorMsg('');
    };


    const imgUpload = async (imageFiles, uploadNum, imgDataArray, updatedInfo) => {

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

        const newImageData = imgDataArray.map(({ url, publicId }) => ({ url, publicId }));
        return newImageData;

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


    // Form validation
    const validationSchema = Yup.object({
        productTitle: Yup.string().required('Title is required'),
        productPrice: Yup.number()
            .positive('Price must be positive')
            .max(9999.99, 'Price must be less than or equal to $9,999.99')
            .test(
                'is-decimal',
                'Price must have up to two decimal places',
                /* 
                    ^: notes the start of the string
                    \d*: any number of digits
                    \.: a literal period
                    \d{1,2}: followed by either 1 or 2 digits
                    |: or
                    \d+: any number of digits without a period.

                    (not used) [^]: means anything that's NOT.
                */
                (value) => /^(\d*\.\d{1,2}|\d+)$/.test(value)
            ),
        productDescription: Yup.string().required('Description is required'),
        productType: Yup.string().required('Product Type is required').oneOf(['Digital Download', 'Physical Item'], 'Invalid Product Type'),
    });

    // Form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        const { productType, productTitle, productPrice, productDescription } = values;
        const updatedInfo = {
            name: productTitle,
            price: productPrice,
            description: productDescription,
            productType
        };

        let uploadNum = 0;
        let imgDataArray = [];
        let deletePublicIdArr = [];

        try {
            // First, check the server. Don't upload photos if the server is down.
            await axiosWithAuth.get('/cloudinary');


            // SCENARIO ONE: POST operation on new listing.
            if (!itemSelectedIdArr && !productId) {
                // First, upload images to Cloudinary.
                if (newlyUploadedImageFiles.length > 0) {
                    try {
                        await imgUpload(newlyUploadedImageFiles, uploadNum, imgDataArray);
                    } catch (error) {
                        console.log('Error with Cloudinary:', error);
                    }
                }

                // Then, post to server.
                updatedInfo.pictures = imgDataArray;
                const response = await axiosWithAuth.post('/products', {
                    updatedInfo
                });

                switchPage(response.data.product);
            }

            // Otherwise, if there is an itemSelectedIdArr or a productId, then we will be updating an existing(s) product(s). But in either case, we will need to update the images anyway. 
            else {

                // Find images missing in exiting imageURLs from original fetchedImgData.
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

                        // Include deletePublicIdArr as a property for updatedInfo, so these can also be deleted from our server.
                        updatedInfo.deletePublicIdArr = deletePublicIdArr;
                    } catch (error) {
                        console.log('Error deleting images:', error);
                    }
                }

                // After existing images are deleted, upload any newly uploaded images to Cloudinary.
                if (newlyUploadedImageFiles.length > 0) {
                    const newImages = await imgUpload(newlyUploadedImageFiles, uploadNum, imgDataArray, updatedInfo);
                    updatedInfo.newImageData = newImages;
                }

                // With the images now taken care of, let's now go through the possible scenarios again.

                // SCENARIO TWO: PUT operation for an existing SINGLE product.
                if (productId && !itemSelectedIdArr) {
                    const response = await axiosWithAuth.put(`/products/${productId}`, {
                        updatedInfo
                    });
                    switchPage(response.data);
                }

                // SCENARIO THREE: PUT operation for updating existing MULTIPLE products
                else if (itemSelectedIdArr && itemSelectedIdArr.length > 0) {
                    const response = await axiosWithAuth.put(`/products/multiple/items`, {
                        itemSelectedIdArr,
                        updatedInfo
                    });
                    switchPage(response.data);
                }

            }


            /*

            // SCENARIO ONE: PUT operation for updating existing MULTIPLE products
            if (itemSelectedIdArr && !productId) {
                // Attach image data to updatedInfo
                const response = await axiosWithAuth.put(`/products/multiple/items`, {
                    productIds: itemSelectedIdArr,
                    updatedInfo
                });
                switchPage(response.data);
            }

            // SCENARIO TWO: PUT operation for updating an existing SINGLE product
            else if (productId) {
                let deleteImagesObj = [];

                // Find images missing in current imageURLs from original fetchedImgData.
                for (let image of fetchedImgData) {
                    if (!existingImagesURLs.includes(image.url)) {
                        deleteImagesObj.push(image);
                    }
                }

                // If images should be deleted, first delete from Cloudinary via their public id.
                if (deleteImagesObj.length > 0) {
                    try {
                        const deleteImgPublicIdArr = [];
                        const deletePromises = deleteImagesObj.map(async (image) => {
                            deleteImgPublicIdArr.push(image.publicId);
                            await axiosWithAuth.delete(`/cloudinary/${image.publicId}`);
                        });

                        await Promise.all(deletePromises);

                        // Include deletePublicIdArr as a property for updatedInfo, so these can be deleted from our server.
                        updatedInfo.deletePublicIdArr = deleteImgPublicIdArr;
                    } catch (error) {
                        console.log('Error deleting images:', error);
                    }
                }

                // After existing images are deleted, upload any newly uploaded images to Cloudinary.
                if (newlyUploadedImageFiles.length > 0) {
                    const newImages = await imgUpload(newlyUploadedImageFiles, uploadNum, imgDataArray, updatedInfo);
                    updatedInfo.newImageData = newImages;
                }

                const response = await axiosWithAuth.put(`/products/${productId}`, {
                    updatedInfo
                });
                switchPage(response.data);

            }

            // SCENARIO THREE: POST operation for posting NEW product
            else {
                // First, upload images to Cloudinary.
                if (newlyUploadedImageFiles.length > 0) {
                    try {
                        await imgUpload(newlyUploadedImageFiles, uploadNum, imgDataArray);
                    } catch (error) {
                        console.log('Error with Cloudinary:', error);
                    }
                }

                // Then, post to server.
                updatedInfo.pictures = imgDataArray;
                const response = await axiosWithAuth.post('/products', {
                    updatedInfo
                });

                switchPage(response.data.product);
            }
            
            */
        } catch (error) {
            console.log('Error in handleSubmit() in PostProduct.js: ', error);
        } finally {
            setSubmitting(false);
        }
    };

    // After form submission
    const switchPage = (data) => {
        let thumbnailURL = '';
        let itemsLength = 0;

        if (itemSelectedIdArr && itemSelectedIdArr.length > 0) {
            itemsLength = itemSelectedIdArr.length;
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
        } else if (itemSelectedIdArr) {
            fetchProduct(itemSelectedIdArr[0]);
        }
    }, []);

    const fetchProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            const data = response.data;
            setTitle(data.name);
            setPrice(data.price);
            setProductType(data.productType);
            setDescription(data.description);
            setFetchedImgData(data.pictures);

            let fetchedImgURLs = [];

            if (data.pictures && data.pictures.length > 0) {
                for (let imgObj of data.pictures) {
                    fetchedImgURLs.push(imgObj.url);
                }
            }

            setExistingImagesURLs(fetchedImgURLs);

        } catch (error) {
            console.log('error in fetch product in PostProduct.js: ', error);
        }
    };


    return (
        <>
            <NavbarAdmin />
            {admin ? (
                <Container>
                    <Row>
                        <Col>
                            {itemSelectedIdArr ? (
                                <h1>Update {itemSelectedIdArr.length} listings</h1>
                            ) :
                                productId ? (
                                    <h1>Update Existing Product</h1>
                                ) : (
                                    <h1>Add New Product</h1>
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
                                <Form>
                                    <Col>
                                        <Label for='product-title'>
                                            <h4>Product Title</h4>
                                        </Label>
                                        <Field type='text' name='productTitle' id='product-title' as={Input} />
                                        <ErrorMessage name='productTitle' component='div' className='text-danger' />

                                    </Col>
                                    <Col>
                                        <Label for='product-price'>
                                            <h4>Price</h4>
                                        </Label>
                                        <div className='d-flex align-items-center'>
                                            <span style={{ fontSize: '25px' }}>$</span>
                                            <Field type='text' name='productPrice' id='product-price' as={Input} style={{ width: '200px' }} />
                                        </div>
                                        <ErrorMessage name='productPrice' component='div' className='text-danger' />

                                    </Col>
                                    <Col>
                                        <Label for='product-description'>
                                            <h4>Product Description</h4>
                                        </Label>
                                        <Field type='textarea' name='productDescription' id='product-description' as={Input} />
                                        <ErrorMessage name='productDescription' component='div' className='text-danger' />

                                    </Col>
                                    <Col>
                                        <Label for='product-type' style={{ margin: '0' }}>
                                            <h4 style={{ marginBottom: '0' }}>Product Type</h4>
                                        </Label>
                                        <Field
                                            type='select'
                                            name='productType'
                                            id='product-type'
                                            as={Input}
                                            style={{ width: '200px' }}
                                        >
                                            <option value='' disabled>Select</option>
                                            <option value='Digital Download'>Digital Download</option>
                                            <option value='Physical Item'>Physical Item</option>
                                        </Field>
                                        <ErrorMessage name='productType' component='div' className='text-danger' />
                                    </Col>


                                    <Col>
                                        {itemSelectedIdArr ? (
                                            <h4>Currently, images cannot be updated when editing multiple products</h4>
                                        ) : (
                                            <>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        marginTop: '20px'
                                                    }}
                                                >
                                                    <h4
                                                        style={{
                                                            margin: '0px 10px 0px 0px'
                                                        }}
                                                    >Images (max. 10)</h4>
                                                    {newlyUploadedImageFiles.length + existingImagesURLs.length < 10 && (
                                                        <>
                                                            <Button
                                                                type='button'
                                                                style={{
                                                                    margin: '0px',
                                                                    padding: '0px',
                                                                    textAlign: 'center',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Label
                                                                    htmlFor="img"
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        padding: '5px',
                                                                        margin: '0px'
                                                                    }}
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
                                                                style={{ fontSize: 0, display: 'none' }} // Set font-size to 0 to hide the text
                                                            // disabled={} 
                                                            />
                                                        </>

                                                    )}

                                                    <h5
                                                        style={{
                                                            margin: '0 0 0 10px',
                                                            color: 'red'
                                                        }}
                                                    >{fileErrorMsg}</h5>
                                                </div>

                                                {(productId || (itemSelectedIdArr && itemSelectedIdArr.length > 0)) && (
                                                    <>
                                                        <h6>Previously Uploaded</h6>
                                                        {existingImagesURLs && existingImagesURLs.length > 0 ?
                                                            existingImagesURLs.map((url, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    style={{
                                                                        display: 'inline-block',
                                                                        width: '200px',
                                                                        height: '200px',
                                                                        border: '1px solid black',
                                                                        margin: '10px 20px 10px 0px',
                                                                        position: 'relative'
                                                                    }}
                                                                >
                                                                    <ImageUpload
                                                                        url={url}
                                                                        idx={idx}
                                                                        existing={true}
                                                                        deleteImgUpload={deleteImgUpload}
                                                                    />
                                                                </div>
                                                            )) : (
                                                                <p>None or all deleted.</p>
                                                            )}

                                                        <h6>Newly Uploaded</h6>
                                                    </>
                                                )}

                                                {newlyUploadedImageURLs
                                                    && newlyUploadedImageURLs.length === 0 ? (
                                                    <p>None.</p>
                                                ) : (
                                                    newlyUploadedImageURLs.map((url, idx) => (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                display: 'inline-block',
                                                                width: '200px',
                                                                height: '200px',
                                                                border: '1px solid black',
                                                                margin: '10px 20px 10px 0px',
                                                                position: 'relative'
                                                            }}
                                                        >
                                                            <ImageUpload
                                                                url={url}
                                                                idx={idx}
                                                                existing={false}
                                                                deleteImgUpload={deleteImgUpload}
                                                            />
                                                        </div>
                                                    ))
                                                )}

                                            </>

                                        )}




                                    </Col>

                                    <div className='d-flex align-items-center'>
                                        <Button
                                            type='submit'
                                            className='bg-primary'
                                            disabled={isSubmitting}
                                            style={{ marginRight: '10px' }}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </Button>
                                        {isSubmitting &&
                                            <>
                                                <SpinningIcon style={{ margin: '0px 20px 0px 20px' }} size='xl' />
                                                <span style={{
                                                    marginLeft: '10px'
                                                }}>
                                                    This may take a moment, and may take longer if you are uploading multiple images.
                                                </span>
                                                <span
                                                    style={{
                                                        color: 'blue',
                                                        fontWeight: 'bold',
                                                        margin: '0px 10px 0px 10px'
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