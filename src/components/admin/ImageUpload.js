import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'


const ImageUpload = ({ url, idx, deleteImgUpload }) => {

    return (
        <>
            <img
                src={url}
                alt='uploaded image by user'
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
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
                    onClick={() => deleteImgUpload(url, idx)}
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        textAlign: 'center',
                        lineHeight: '20px',
                        cursor: 'pointer',
                    }}
                >
                    <FontAwesomeIcon icon={faCircleXmark} size="lg" />
                </div>
            </div>
        </>
    )
}

export default ImageUpload