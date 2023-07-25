import { Carousel, CarouselItem, CarouselCaption, CarouselControl } from 'reactstrap';
import { useState } from 'react';

/*
To set up a carousel, you need the following:
    (1) Array of Images,
    (2) Next and Previous functions (using %)
    (3) Carousel which has a child CarouselItem (with possibly CarouselCaption and whatnot),

    (2) A state to keep track of the index (if you want to do more than just next and prev)
*/

const ProductImgCarousel = ({ selectedProduct }) => {
    const imgArray = selectedProduct.img;

    const [currImg, setCurrImg] = useState(0);

    const next = () => {
        // Example: if we have an array [0, 1, 2], and the current index is 0, we would add 1 then % the length, giving us 1 % 3 = 0 Remainder 1. % the length should simply give us the index. But, if we're at the last index, and we do 3 % 3, it gives us 1 Remainder 0, bringing us back to the first index 0.
        const nextIndex = (currImg + 1) % imgArray.length;
        setCurrImg(nextIndex);
    };

    const previous = () => {
        // Similar concept to the next function, but we add the length to prevent any negative numbers (in case the currImg is at 0).
        const prevIndex = (currImg - 1 + imgArray.length) % imgArray.length;
        setCurrImg(prevIndex);
    };

    return (
        <>
            <div className='d-flex'>
                <div className='d-flex flex-column' style={{ width: '100px', height: 'auto', marginRight: '10px', }}>
                    {imgArray.map((image, idx) => (
                        <img
                            key={idx}
                            src={image}
                            alt={selectedProduct.name}
                            style={{
                                marginBottom: '10px',
                                border: currImg === idx ? '1px solid black' : 'none'
                            }}
                            onClick={() => setCurrImg(idx)}
                        />
                    ))}
                </div>

                {/* Ride = 'carousel' prevents the carousel from automatically transitioning */}
                <Carousel activeIndex={currImg} next={next} previous={previous} ride='carousel'>
                    {imgArray.map((image, idx) => (
                        <CarouselItem key={idx}>
                            <img src={image} alt={selectedProduct.name} style={{ width: '100%' }} />
                        </CarouselItem>
                    ))}
                    <CarouselControl direction="prev" onClickHandler={previous} />
                    <CarouselControl direction="next" onClickHandler={next} />
                </Carousel>
            </div>

        </>

    );
};

export default ProductImgCarousel;