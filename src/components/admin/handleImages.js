import axios from "axios";

const MAX_IMAGE_COUNT = 10;

export const handleImageChangeWrapper = (
    setFileErrorMsg,
    setNewlyUploadedImagesFiles,
    setNewlyUploadedImagesURLs,
    newlyUploadedImagesFiles,
    newlyUploadedImagesURLs,
    existingImagesURLs,
) => {

    return async (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        const numUploaded = filesArray.length + newlyUploadedImagesFiles.length + (existingImagesURLs ? existingImagesURLs.length : 0);

        if (numUploaded > MAX_IMAGE_COUNT) {
            setFileErrorMsg('You can only have a maximum of 10 images total.');
            setTimeout(() => setFileErrorMsg(''), 10000);
            return;
        }

        let updatedNewImgURLs = [...newlyUploadedImagesURLs];

        for (let i = 0; i < filesArray.length; i++) {
            const url = URL.createObjectURL(filesArray[i]);
            updatedNewImgURLs.push(url);
        }

        setNewlyUploadedImagesFiles([...newlyUploadedImagesFiles, ...filesArray]);
        setNewlyUploadedImagesURLs(updatedNewImgURLs);
        setFileErrorMsg('');
    };
};

export const deleteImgUpload = (
    urlToDelete,
    idx,
    newlyUploadedImagesURLs,
    setNewlyUploadedImagesURLs,
    newlyUploadedImagesFiles,
    setNewlyUploadedImagesFiles,
    existingImagesURLs,
    setExistingImagesURLs,
) => {

    if (existingImagesURLs) {
        const updatedURLs = existingImagesURLs.filter(imgUrl => imgUrl !== urlToDelete);
        setExistingImagesURLs(updatedURLs);
    } else {
        const updatedURLs = newlyUploadedImagesURLs.filter(imgUrl => imgUrl !== urlToDelete);
        const updatedFiles = newlyUploadedImagesFiles.filter((file, index) => idx !== index);

        setNewlyUploadedImagesURLs(updatedURLs);
        setNewlyUploadedImagesFiles(updatedFiles);
    }
};

export const deleteExistingImages = (existingImagesURLs, setExistingImagesURLs,) => {
    return urlToDelete => {
        const updatedURLs = existingImagesURLs.filter(imgUrl => imgUrl !== urlToDelete);
        setExistingImagesURLs(updatedURLs);
    }
};

export const deleteUploadedImages = (
    setNewlyUploadedImagesURLs,
    setNewlyUploadedImagesFiles,
) => {
    return (urlToDelete, idx) => {
        setNewlyUploadedImagesURLs(prevURLs => prevURLs.filter(imgUrl => imgUrl !== urlToDelete));
        setNewlyUploadedImagesFiles(prevFiles => prevFiles.filter((file, index) => idx !== index));
    }
};


export const imgUpload = async (imageFiles, setImageUploadNum, imgDataArray,) => {

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
        setImageUploadNum(prev => prev + 1);
    });

    await Promise.all(uploadPromises);
    imgDataArray.sort((a, b) => a.position - b.position);

    return imgDataArray.map(({ url, publicId }) => ({ url, publicId }));
};