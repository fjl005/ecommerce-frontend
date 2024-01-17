import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown, faPaperclip } from '@fortawesome/free-solid-svg-icons';

const DigitalProduct = () => {
    return (
        <>
            <p>
                <FontAwesomeIcon icon={faCloudArrowDown} className='product-info-icon-align' />
                Digital Download
            </p>
            <p>
                <FontAwesomeIcon icon={faPaperclip} className='product-info-icon-align' />
                1 PDF Included
            </p>
        </>
    )
}

export default DigitalProduct;