import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Label, Input, Button } from 'reactstrap';
import ImageForm from './ImageForm';
import { PRODUCT_ASPECT } from './productAspectFormat';
import { imgUpload, } from './handleImages';
import { axiosWithAuth } from '../miscellaneous/axios';
import { usePostProductContext } from '../../contexts/PostProductContext';
import SpinningIcon from '../miscellaneous/SpinningIcon';
import { Link } from 'react-router-dom';

const PostProductForm = ({
    preExistingProduct,
    formikInitial,
    productId,
    itemsSelectedIdArr,
}) => {

    const { newlyUploadedImagesFiles, imageUploadNum, setImageUploadNum, existingImagesURLs } = usePostProductContext();

    const validationSchema = Yup.object({
        [PRODUCT_ASPECT.productName.short]: Yup.string().required('Title is required'),
        [PRODUCT_ASPECT.productPrice.short]: Yup.number()
            .positive('Price must be positive')
            .max(9999.99, 'Price must be less than or equal to $9,999.99')
            .test(
                'is-decimal',
                'Price must have up to two decimal places',
                (value) => /^(\d*\.\d{1,2}|\d+)$/.test(value)
            ),
        [PRODUCT_ASPECT.productType.short]: Yup.string().required('Product Type is required').oneOf(['Digital Download', 'Physical Item'], 'Invalid Product Type'),
        [PRODUCT_ASPECT.productDescription.short]: Yup.string().required('Description is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const {
            productName,
            productPrice,
            productType,
            productDescription,
        } = values;

        const uploadInfo = {
            productName,
            price: productPrice,
            description: productDescription,
            productType
        };

        const imgDataArray = [];

        try {
            await axiosWithAuth.get('/cloudinary'); // First, check the server. Don't upload photos if the server is down.
            if (!preExistingProduct) { // CASE ONE (easiest): uploading new product.
                if (newlyUploadedImagesFiles.length > 0) {
                    try {
                        await imgUpload(newlyUploadedImagesFiles, setImageUploadNum, imgDataArray);
                    } catch (error) {
                        console.log('Error with uploading images to cloudinary:', error);
                    }
                }
                uploadInfo.pictures = imgDataArray;
                const response = await axiosWithAuth.post('/products', { uploadInfo });
                switchPage(response.data.product);
            } else { // Otherwise, we're dealing with an existing product. We may have to delete existing photos, and we may also have to upload new photos.
                if (existingImagesURLs.length > 0) {
                    console.log('existing images url: ', existingImagesURLs);
                    const deleteImagesObj = existingImagesURLs.filter(image => !existingImagesURLs.includes(image.url));
                    if (deleteImagesObj.length > 0) { // Find images missing in existing imageURLs from original fetchedImgData; they will be deleted.
                        try {
                            const deletePublicIdArray = [];
                            const deletePromises = deleteImagesObj.map(async (image) => {
                                deletePublicIdArray.push(image.publicId);
                                await axiosWithAuth.delete(`/cloudinary/${image.publicId}`);
                            });
                            await Promise.all(deletePromises);
                            uploadInfo.deletePublicIdArr = deletePublicIdArray;
                        } catch (error) { console.log('Error deleting images:', error); }
                    }
                }

                if (newlyUploadedImagesFiles.length > 0) { // After existing images are deleted, upload any new images to Cloudinary.
                    const newImages = await imgUpload(newlyUploadedImagesFiles, setImageUploadNum, imgDataArray,);
                    uploadInfo.newImageData = newImages;
                }

                if (productId && !itemsSelectedIdArr) { // CASE TWO: PUT operation for an existing SINGLE product.
                    const response = await axiosWithAuth.put(`/products/${productId}`, {
                        uploadInfo
                    });
                    switchPage(response.data);
                } else if (itemsSelectedIdArr && itemsSelectedIdArr.length > 0) { // CASE THREE: PUT operation for updating existing MULTIPLE products
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

    const switchPage = (data) => {
        const thumbnailURL = data.pictures.length > 0 ? data.pictures[0].url : '';
        const itemsLength = itemsSelectedIdArr && itemsSelectedIdArr.length > 0 ? itemsSelectedIdArr.length : 0;

        const dataToPass = {
            name: data.productName,
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

    const formFields = [
        [
            {
                col: '12',
                productAspect: PRODUCT_ASPECT.productName,
                fieldType: 'text',
                productPrice: false,
                productType: [],
            },
        ],
        [
            {
                col: '6',
                productAspect: PRODUCT_ASPECT.productPrice,
                fieldType: 'text',
                productPrice: true,
                productType: [],
            },
            {
                col: '6',
                productAspect: PRODUCT_ASPECT.productType,
                fieldType: 'select',
                productPrice: false,
                productType: [
                    {
                        disabled: true,
                        value: '',
                        text: 'Select',
                    },
                    {
                        disabled: false,
                        value: 'Digital Download',
                        text: 'Digital Download',
                    },
                    {
                        disabled: false,
                        value: 'Physical Item',
                        text: 'Physical Item'
                    }
                ],
            },
        ],
        [
            {
                col: '12',
                productAspect: PRODUCT_ASPECT.productDescription,
                fieldType: 'textarea',
                productPrice: false,
                rows: 5,
                productType: [],
            }
        ],
    ];

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formikInitial}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    {formFields.map((productAspects, productAspectsIndex) => (
                        <Row key={productAspectsIndex} className='mb-3'>
                            {productAspects.map((formField, formFieldIndex) => (
                                <Col key={formFieldIndex} xs={formField.col}>
                                    <Label htmlFor={formField.productAspect.short} className='post-product-admin-label'>
                                        <h3 className='mb-0'>{formField.productAspect.full}</h3>
                                    </Label>

                                    {formField.productType.length > 0 ? (
                                        <Field
                                            type={formField.fieldType}
                                            name={formField.productAspect.short}
                                            id={formField.productAspect.short}
                                            as={Input}
                                            rows={formField.rows}
                                        >
                                            {formField.productType.length > 0 && formField.productType.map((selection) => (
                                                <option
                                                    key={selection.value}
                                                    value={selection.value}
                                                    disabled={selection.disabled}
                                                >
                                                    {selection.text}
                                                </option>
                                            ))}
                                        </Field>
                                    ) : (
                                        <Field
                                            type={formField.fieldType}
                                            name={formField.productAspect.short}
                                            id={formField.productAspect.short}
                                            as={Input}
                                            rows={formField.rows}
                                        />
                                    )}
                                    <ErrorMessage name={formField.productAspect.short} component='div' className='text-danger' />
                                </Col>
                            ))}
                        </Row>
                    ))}

                    <Row>
                        <Col>
                            {itemsSelectedIdArr ? (
                                <h3>Image Updating for multiple products is not supported at this time.</h3>
                            ) : (
                                <ImageForm preExistingProduct={preExistingProduct} />
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col className='mt-5'>
                            <Button type='submit' className='bg-primary mr-3 btn-border-none' disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>

                            <Button className='mr-3 btn-border-none'>
                                <Link
                                    to={preExistingProduct ? '/admin/editproductsselection' : '/admin'}
                                    className='white-text'
                                >
                                    Cancel
                                </Link>
                            </Button>

                            {isSubmitting &&
                                <>
                                    <SpinningIcon size='xl' />
                                    <span className='ml-3'>
                                        This may take a moment, and may take longer if you are uploading multiple images.
                                    </span>
                                    <span className='blue-bolded-text'>
                                        Uploaded {imageUploadNum} of {newlyUploadedImagesFiles.length} images.
                                    </span>
                                </>
                            }
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default PostProductForm;