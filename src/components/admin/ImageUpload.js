import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import SpinningIcon from '../miscellaneous/SpinningIcon';
import { useState } from 'react';

const ImageUpload = ({ url, idx, deleteImgUpload, existing }) => {
    const [loading, setLoading] = useState(true);

    const handleOnload = () => {
        setLoading(false);
        console.log('loaded');
    }

    return (
        <>
            <img
                src={url}
                alt='uploaded image by user'
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: loading ? 'none' : 'inline',
                }}

                onLoad={handleOnload}
                onError={handleOnload}
            />

            {loading ? (
                <SpinningIcon size='2x' />
            ) : (
                <div
                    style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        alignItems: 'center',
                    }}
                >
                    <div
                        onClick={() => deleteImgUpload(url, idx, existing)}
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
            )}


        </>
    )
};

export default ImageUpload;
