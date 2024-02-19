import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { usePostProductContext } from '../../contexts/PostProductContext';

const ImageUpload = ({ url, idx, newUpload }) => {

    const { deleteImagesNew, deleteImagesExisting } = usePostProductContext();

    return (
        <>
            <img
                src={url}
                alt='uploaded image by user'
                className='w-100 h-100'
            />

            <div
                style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    alignItems: 'center',
                }}
            >
                <div
                    onClick={() => newUpload ? deleteImagesNew(url, idx) : deleteImagesExisting(url, idx)}
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        textAlign: 'center',
                        lineHeight: '1.5rem',
                        cursor: 'pointer',
                    }}
                >
                    <FontAwesomeIcon icon={faCircleXmark} size="xl" />
                </div>
            </div>
        </>
    )
};

export default ImageUpload;
