import { Carousel, CarouselItem } from 'reactstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/*
To set up a carousel, you need the following:
    (1) Array of Images,
    (2) Next and Previous functions (using %)
    (3) Carousel which has a child CarouselItem (with possibly CarouselCaption and whatnot)
*/

const ProductImgCarousel = ({ selectedProduct }) => {
    const imgArray = selectedProduct.img;

    const [currImg, setCurrImg] = useState(0);

    const next = () => {
        // Example: if we have an array [0, 1, 2], and the current index is 0, we would add 1 then % the length, giving us 1 % 3 = 0 Remainder 1. % the length should simply give us the index. But, if we're at the last index, and we do 3 % 3, it gives us 1 Remainder 0, bringing us back to the first index 0.
        const nextIndex = (currImg + 1) % imgArray.length;
        console.log('current index is: ', currImg);
        console.log('next index is: ', nextIndex);
        setCurrImg(nextIndex);
    };

    const previous = () => {
        // Similar concept to the next function, but we add the length to prevent any negative numbers (in case the currImg is at 0).
        const prevIndex = (currImg - 1 + imgArray.length) % imgArray.length;
        console.log('current index is: ', currImg);
        console.log('previous index is: ', prevIndex);
        setCurrImg(prevIndex);
    };

    return (
        <>
            {/* Grandparent Div */}
            <div className='d-flex'>

                {/* Parent 1 Div, which will create the space for the image array. Height is not defined as it will be automatically adjusted to the carousel image. */}
                <div
                    className='product-img-array'
                    style={{
                        width: '80px',
                        marginRight: '10px',
                        overflowY: 'scroll',
                        position: 'relative',
                    }}>

                    {/* Child Div, which will be positioned absolute to the Parent 1 Div. It's in this space where the image array will be created statically. The purpose for the Child Div is so that it doesn't influence the height of the Grandparent Div. Without the Child Div, the Parent 1 Div will have its height automatically adjust to the Img Array Map, which will then dictate the height. However, I want the Carousel Image to dictate the height. */}
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        top: '0px',
                        left: '0px',
                    }}>

                        {imgArray.map((image, idx) => (
                            <img
                                key={idx}
                                src={image}
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

                {/* Flex: 1 is a shorthand way of setting flex-grow: 1, flex-shrink: 1, and flex-basis: 0. 
                
                Flex-grow: the flex item will take up any available space left in the container after other flex items have taken up their initial sizes. Setting it to 1 means it will take up any available space remaining. 

                Flex-shrink: the flex item will shrink if there is not enough space in the container. Setting it to 1 means it will shrink proportionally if the container becomes too small (0 means it won't shrink at all).

                Flex-basis: It sets the initial main size of the flex item. If set to 0, then the remaining space will be distributed based on flex-grow.

                TL/DR: when you use Flex: 1, you are telling the flex item to grow and take up any available space, or shrink as need be. 

                 */}
                <div className='d-flex align-items-center' style={{ flex: '1' }}>
                    <div className='circle-product-carousel-nav'>
                        <i className="fa-solid fa-angle-left" onClick={previous} style={{ fontSize: '24px' }}></i>
                    </div>
                    <Carousel
                        activeIndex={currImg}
                        next={next}
                        previous={previous}
                        interval={null}
                        style={{
                            flex: '1',
                        }}
                    >
                        {imgArray.map((image, idx) => (
                            <CarouselItem key={idx}>
                                <div className='d-flex align-items-center'>
                                    <img
                                        src={image}
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
                    <div className='circle-product-carousel-nav'>
                        <i className="fa-solid fa-angle-right" onClick={next} style={{ fontSize: '24px' }}></i>
                    </div>
                </div>
            </div>

            {/* The below was used to help me understand the overflow Y situation.  */}
            {/* <div className='grandparent' style={{
                backgroundColor: 'lightblue',
                padding: '30px',
                display: 'flex',
            }}>

                grandparent

                <div className='parent-one' style={{
                    backgroundColor: 'red',
                    padding: '10px',
                    position: 'relative',
                    overflowY: 'scroll',
                }}>
                    parent one



                    <div className='child-one' style={{
                        backgroundColor: 'green',
                        padding: '5px',
                        height: '1000px',
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        overflowY: 'scroll',
                    }}>

                        child one

                        {/* {imgArray.map((image, idx) => (
                            <div key={idx} style={{ position: "relative", width: "100px", height: "100px" }}>
                                <img src={image} alt={`Image ${idx}`} style={{ position: 'absolute', width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        ))} */}

            {/* {imgArray.map((image, idx) => (
                            <img key={idx} src={image} alt={`Image ${idx}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                        ))}

                    </div>

                </div>

                <div className='parent-two' style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '20px',
                    height: '200px',
                }}>

                    parent two
                </div>
            </div> */}
        </>


    );
};

export default ProductImgCarousel;

