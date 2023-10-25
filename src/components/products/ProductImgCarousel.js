import { Carousel, CarouselItem } from 'reactstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import fetsyEcommerceLogo from '../../img/fetsyEcommerceLogo.png';


const ProductImgCarousel = ({ selectedProduct }) => {
    const imgObjArray = selectedProduct.pictures;
    const imgURLArray = [];

    if (imgObjArray.length === 0) {
        imgURLArray.push(null);
    } else {
        for (let imgObj of imgObjArray) {
            imgURLArray.push(imgObj.url);
        }
    }

    const [currImg, setCurrImg] = useState(0);

    const next = () => {
        const nextIndex = (currImg + 1) % imgURLArray.length;
        setCurrImg(nextIndex);
    };

    const previous = () => {
        // Similar concept to the next function, but we add the length to prevent any negative numbers (in case the currImg is at 0).
        const prevIndex = (currImg - 1 + imgURLArray.length) % imgURLArray.length;
        setCurrImg(prevIndex);
    };

    return (
        <div className='d-flex'>
            <div
                className='product-img-array'
                style={{
                    width: '80px',
                    marginRight: '10px',
                    overflowY: 'scroll',
                    position: 'relative',
                }}>

                <div style={{
                    position: 'absolute',
                    width: '100%',
                    top: '0px',
                    left: '0px',
                }}>

                    {imgURLArray.map((image, idx) => (
                        <img
                            key={idx}
                            src={image === null ? fetsyEcommerceLogo : image}
                            alt={selectedProduct.name}
                            className='product-img-array-image-thumbnail'
                            style={{
                                opacity: currImg === idx ? '1' : '0.5',
                                border: currImg === idx ? '1px solid black' : 'none',

                            }}
                            onClick={() => setCurrImg(idx)}
                        />
                    ))}
                </div>
            </div>

            <div className='d-flex align-items-center' style={{ flex: '1' }}>
                {imgURLArray.length > 1 && (
                    <div className='circle-product-carousel-nav'>
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            onClick={previous}
                            style={{ fontSize: '24px' }}
                        />
                    </div>
                )}

                <Carousel
                    activeIndex={currImg}
                    next={next}
                    previous={previous}
                    interval={null}
                    style={{
                        flex: '1',
                    }}
                >
                    {imgURLArray.map((image, idx) => (
                        <CarouselItem key={idx}>
                            <div className='d-flex align-items-center'>
                                <img
                                    src={image === null ? fetsyEcommerceLogo : image}
                                    alt={selectedProduct.name}
                                    style={{
                                        width: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                    }}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </Carousel>

                {imgURLArray.length > 1 && (
                    <div className='circle-product-carousel-nav'>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            onClick={next}
                            style={{ fontSize: '24px' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductImgCarousel;

