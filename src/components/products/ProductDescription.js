import { useState, useRef, useEffect } from 'react';
import { Button } from 'reactstrap';

const ProductDescription = () => {
    /* STATES AND REFS */
    const [expanded, setExpanded] = useState(false);
    const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);
    // We will need the viewport width to track responsiveness and then determine whether a 'see more' button is needed for the description.
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    // useRef is used to access the height of the description p-element. UseRef does not trigger re-renders when the value changes (aka the height changes).
    const descriptionRef = useRef(null);


    /* FUNCTIONS */
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const doesTextOverflow = () => {
        // Grab the height of the p element's height, and see if it's greater than 100 px. If it is, then we will create a 'see more' button.
        return descriptionRef.current.clientHeight > 100;
    };

    /* USE EFFECTS */
    useEffect(() => {
        // Update the viewportWidth state when the window is resized
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts or a re-render occurs
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Check if the text overflows whenever the viewport width changes
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
                <p
                    ref={descriptionRef}
                >
                    hello hello hello hello hello helloadsfjoidsadsahelloadsfjoidsadsafadsfdsafsadfdsjfioadshellofadsfdsafsadfdsjfioadshello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello dsafadsfasdfadsds sd dsfdsfdsafsdf sdfsdfds sdf sdfsdfsd sdfsddsafds
                </p>
            </div>

            {showSeeMoreButton && !expanded &&
                <div className='d-flex justify-content-center'>
                    <span
                        className='see-more-less-button'
                        onClick={toggleExpanded}
                        style={{ color: 'gray' }}
                    >
                        See More
                    </span>
                </div>
            }

            {expanded &&
                <div className='d-flex justify-content-center'>
                    <span
                        className='see-more-less-button'
                        onClick={toggleExpanded}
                        style={{ color: 'gray' }}
                    >
                        See Less
                    </span>
                </div>
            }
        </>

    )
}

export default ProductDescription