import { useState, } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';

const ProductImgCarousel = ({ selectedProduct }) => {
    const imgObjArray = selectedProduct.pictures;
    const imgURLArray = [];
    const [currImg, setCurrImg] = useState(0);

    if (imgObjArray.length === 0) {
        imgURLArray.push(null);
    } else {
        for (let imgObj of imgObjArray) {
            imgURLArray.push(imgObj.url);
        }
    }

    const next = () => {
        setCurrImg((prevImg) => (prevImg + 1) % imgURLArray.length);
    };

    const previous = () => {
        setCurrImg((prevImg) => (prevImg - 1 + imgURLArray.length) % imgURLArray.length);
    };

    return (
        <div className='d-flex'>
            {imgURLArray.length > 1 && (
                <>
                    <div className='product-img-carousel-container'>
                        {imgURLArray.map((image, idx) => (
                            <img
                                key={idx}
                                className={
                                    `product-img-thumbnail
                                ${currImg === idx ? 'product-img-thumbnail-active' : ''}`}
                                src={image === null ? fetsyEcommerceLogo : image}
                                alt={selectedProduct.name}
                                onClick={() => setCurrImg(idx)}
                            />
                        ))}
                    </div>
                </>

            )}


            <div className='d-flex align-items-center justify-content-between' style={{ flex: '1' }}>
                {imgURLArray.length > 1 ? (
                    <div
                        className='circle-product-carousel-nav'
                        onClick={() => previous()}
                    >
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            style={{ fontSize: '1.5rem' }}
                        />
                    </div>
                ) : <div className='no-carousel-nav'></div>}

                {imgURLArray.map((image, idx) => (
                    currImg === idx && (
                        <div key={idx} style={{ width: '90%' }} className='text-center'>
                            <img
                                key={idx}
                                src={image === null ? fetsyEcommerceLogo : image}
                                alt={selectedProduct.name}
                                style={{ width: '100%', }}
                            />
                        </div>
                    )
                ))}

                {imgURLArray.length > 1 ? (
                    <div className='circle-product-carousel-nav'
                        onClick={() => next()}
                    >
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            style={{ fontSize: '1.5rem' }}
                        />
                    </div>
                ) : <div className='no-carousel-nav'></div>}
            </div>
        </div>
    );
};

export default ProductImgCarousel;

