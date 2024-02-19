import { useContext, createContext, useState } from "react";
import { handleImageChangeWrapper, deleteUploadedImages, deleteExistingImages } from "../components/admin/handleImages";

const PostProductContext = createContext();

export const PostProductProvider = ({ children }) => {
    const [newlyUploadedImagesFiles, setNewlyUploadedImagesFiles] = useState([]);
    const [newlyUploadedImagesURLs, setNewlyUploadedImagesURLs] = useState([]);
    const [imageUploadNum, setImageUploadNum] = useState(0);
    const [existingImagesURLs, setExistingImagesURLs] = useState([]);
    const [fileErrorMsg, setFileErrorMsg] = useState('');

    const createHandleImageChange = (existingImagesURLs) => {
        return handleImageChangeWrapper(
            setFileErrorMsg,
            setNewlyUploadedImagesFiles,
            setNewlyUploadedImagesURLs,
            newlyUploadedImagesFiles,
            newlyUploadedImagesURLs,
            existingImagesURLs
        );
    };

    const handleImageChangeNew = createHandleImageChange(null);
    const handleImageChangeExisting = createHandleImageChange(existingImagesURLs);

    const deleteImagesNew = deleteUploadedImages(setNewlyUploadedImagesURLs, setNewlyUploadedImagesFiles);
    const deleteImagesExisting = deleteExistingImages(existingImagesURLs, setExistingImagesURLs);


    const value = {
        newlyUploadedImagesFiles,
        setNewlyUploadedImagesFiles,
        newlyUploadedImagesURLs,
        setNewlyUploadedImagesURLs,
        imageUploadNum,
        setImageUploadNum,
        fileErrorMsg,
        setFileErrorMsg,
        handleImageChangeNew,
        handleImageChangeExisting,
        deleteImagesNew,
        deleteImagesExisting,
        existingImagesURLs,
        setExistingImagesURLs,
    }

    return (
        <PostProductContext.Provider value={value}>
            {children}
        </PostProductContext.Provider>
    );
};

export const usePostProductContext = () => useContext(PostProductContext);