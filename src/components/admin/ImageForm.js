import React from 'react'
import { Label, Input, Button } from 'reactstrap'
import ImageUpload from './ImageUpload';
import { usePostProductContext } from '../../contexts/PostProductContext';

const ImageForm = ({ preExistingProduct }) => {
    const {
        newlyUploadedImagesFiles,
        newlyUploadedImagesURLs,
        existingImagesURLs,
        handleImageChangeExisting,
        handleImageChangeNew,
        fileErrorMsg,
    } = usePostProductContext();

    const totalImagesNum = newlyUploadedImagesFiles.length + (existingImagesURLs ? existingImagesURLs.length : 0);

    return (
        <>
            <h3 className='mr-3'>
                Images - This product has
                <span className='blue-bolded-text' style={{ margin: 0 }}> {totalImagesNum} images </span>
                (max. 10 allowed).
            </h3>



            <Label className='post-product-admin-label d-flex align-items-center'>
                {totalImagesNum < 10 && (
                    <>
                        <div className='d-flex align-items-center'>
                            <Button type='button' className='btn-warning btn-border-none'>
                                <Label htmlFor="img" style={{ cursor: 'pointer', margin: '0' }}>
                                    Upload Images
                                </Label>
                            </Button>
                            <Input
                                name='productImg'
                                id='img'
                                type='file'
                                accept='image/*'
                                multiple
                                onChange={event => preExistingProduct ? handleImageChangeExisting(event) : handleImageChangeNew(event)}
                                style={{ fontSize: 0, display: 'none' }}
                            />
                            <p className='ml-3 mb-0'>Recommended picture dimensions are 2000 x 2000 px.</p>
                        </div>
                    </>
                )}
            </Label>

            <h4 className='red-text'>{fileErrorMsg}</h4>

            {preExistingProduct && (
                <h4 className='mt-5'>
                    Newly Uploaded
                    <span className='blue-bolded-text' style={{ margin: 0 }}> ({newlyUploadedImagesURLs.length})</span>:
                </h4>
            )}
            {newlyUploadedImagesURLs && newlyUploadedImagesURLs.length > 0 && (
                newlyUploadedImagesURLs.map((url, idx) => (
                    <div key={idx} className='image-upload-container-admin'>
                        <ImageUpload url={url} idx={idx} newUpload={true} />
                    </div>
                ))
            )}

            {preExistingProduct && existingImagesURLs && (
                <>
                    <h4 className='mt-5'>
                        Previously Uploaded
                        <span className='blue-bolded-text' style={{ margin: 0 }}>
                            {' ('}
                            {existingImagesURLs.length === 0 ? (
                                'None or all deleted'
                            ) : existingImagesURLs.length}
                            {')'}
                        </span>
                        :
                    </h4>

                    {existingImagesURLs.length > 0 &&
                        existingImagesURLs.map((url, idx) => (
                            <div key={idx} className='image-upload-container-admin'>
                                <ImageUpload url={url} idx={idx} newUpload={false} />
                            </div>
                        ))
                    }
                </>
            )}
        </>
    )
}



export default ImageForm