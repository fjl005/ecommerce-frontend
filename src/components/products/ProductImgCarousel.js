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
        // (prevImg) represents the previous state value of currImg.
        setCurrImg((prevImg) => (prevImg + 1) % imgURLArray.length);
    };

    const previous = () => {
        setCurrImg((prevImg) => (prevImg - 1 + imgURLArray.length) % imgURLArray.length);
    };

    return (
        <div className='d-flex'>
            <div className='product-img-carousel-container'>
                {imgURLArray.map((image, idx) => (
                    <img
                        key={idx}
                        className={
                            `product-img-carousel product-img-array-thumbnail
                                ${currImg === idx ? 'product-img-array-thumbnail-active' : ''}`}
                        src={image === null ? fetsyEcommerceLogo : image}
                        alt={selectedProduct.name}
                        onClick={() => setCurrImg(idx)}
                    />
                ))}
            </div>

            <div className='d-flex align-items-center justify-content-between' style={{ flex: '1' }}>
                {imgURLArray.length > 1 ? (
                    <div className='circle-product-carousel-nav'>
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            onClick={previous}
                            style={{ fontSize: '24px' }}
                        />
                    </div>
                ) : <div className='no-carousel-nav'></div>}

                {imgURLArray.map((image, idx) => (
                    currImg === idx && (
                        <div key={idx} style={{ width: '90%' }}>
                            <img
                                key={idx}
                                src={image === null ? fetsyEcommerceLogo : image}
                                alt={selectedProduct.name}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </div>

                    )
                ))}

                {imgURLArray.length > 1 ? (
                    <div className='circle-product-carousel-nav'>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            onClick={next}
                            style={{ fontSize: '24px' }}
                        />
                    </div>
                ) : <div className='no-carousel-nav'></div>}
            </div>
        </div>
    );
};

export default ProductImgCarousel;

