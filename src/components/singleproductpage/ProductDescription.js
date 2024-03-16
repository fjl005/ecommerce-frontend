import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
        return descriptionRef.current.clientHeight > 55;
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
                    height: expanded ? 'auto' : '55px',
                    overflow: 'hidden',
                    transition: 'height 0.3s, overflow 0.3s',
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                }}
            >
                <p ref={descriptionRef}>{description}</p>
            </div>

            {showSeeMoreButton &&
                <div className='mt-2 d-flex justify-content-center'>
                    <span
                        className='see-more-less-button'
                        onClick={toggleExpanded}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        {expanded ?
                            `  See Less  `
                            : `  See More  `
                        }
                        <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                </div>
            }
        </>

    )
}

export default ProductDescription