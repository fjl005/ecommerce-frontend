import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown, faGift, faPaperclip, faTruck } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const ProductTypeIcons = ({ productType }) => {
    const productTypeIcon = new Map();
    productTypeIcon.set('Digital Download', faCloudArrowDown);
    productTypeIcon.set('Physical Item', faGift);

    const productContentIcon = new Map();
    productContentIcon.set('Digital Download', faPaperclip);
    productContentIcon.set('Physical Item', faTruck);

    const [productContent, setProductContent] = useState('');

    useEffect(() => {
        if (productType === 'Digital Download') {
            setProductContent('File Type: 1 PDF(s).');
        } else if (productType === 'Physical Item') {
            setProductContent('Product Type: 1 Card.');
        }
    }, [productType]);

    return (
        <>
            <div className='icon-text-div'>
                {productTypeIcon.has(productType) && (
                    <div className='icon-margin-align'>
                        <FontAwesomeIcon icon={productTypeIcon.get(productType)} />
                    </div>
                )}
                <p className='m-bot-0'>{productType}</p>
            </div>

            <div className='icon-text-div'>
                {productContentIcon.has(productType) && (
                    <div className='icon-margin-align'>
                        <FontAwesomeIcon icon={productContentIcon.get(productType)} />
                    </div>
                )}
                <p className='m-bot-0'>{productContent}</p>
            </div>
        </>
    );
};

export default ProductTypeIcons;
