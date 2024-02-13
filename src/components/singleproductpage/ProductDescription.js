import { useState, useRef, useEffect } from 'react';

const ProductDescription = ({ props }) => {
    const description = props;

    const [expanded, setExpanded] = useState(false);
    const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const descriptionRef = useRef(null);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const doesTextOverflow = () => {
        return descriptionRef.current.clientHeight > 100;
    };

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setShowSeeMoreButton(doesTextOverflow());
    }, [viewportWidth]);


    return (
        <>
            <div
                style={{
                    height: expanded ? 'auto' : '100px',
                    overflow: 'hidden',
                    transition: 'height 0.3s, overflow 0.3s',
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                }}>

                <p ref={descriptionRef}>{description}</p>
            </div>

            {showSeeMoreButton && !expanded &&
                <div className='d-flex justify-content-center'>
                    <span
                        className='see-more-less-button'
                        onClick={toggleExpanded}
                    >
                        {'<-- See More -->'}
                    </span>
                </div>
            }

            {expanded &&
                <div className='d-flex justify-content-center'>
                    <span
                        className='see-more-less-button'
                        onClick={toggleExpanded}
                    >
                        {'<-- See Less -->'}
                    </span>
                </div>
            }
        </>

    )
}

export default ProductDescription