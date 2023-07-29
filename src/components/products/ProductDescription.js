import { useState } from 'react';
import { Button } from 'reactstrap';

const ProductDescription = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <div style={{
                height: expanded ? 'auto' : '100px',
                overflow: 'hidden',
                transition: 'height 0.3s, overflow 0.3s',
            }}>
                {/* Your long description content */}
                <p>I am making the description long on purpose to create a really long column. I noticed on Etsy that this right column extends to the height of the image and reviews (on the left column). However, when brought to smaller viewport sizes, the order goes (1) image, (2) right column, (3) reviews. So, I created some viewport conditional rendering</p>
                <p>Enter description here</p> <p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p><p>Enter description here</p>
            </div>
            {!expanded &&
                <div className='d-flex justify-content-center'>
                    <span
                        className='see-more-less-button'
                        onClick={toggleExpanded}
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
                    >
                        See Less
                    </span>
                </div>
            }
        </>

    )
}

export default ProductDescription