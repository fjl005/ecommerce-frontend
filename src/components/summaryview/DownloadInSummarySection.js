import { useState } from "react";
import { Tooltip } from "reactstrap";

const DownloadLinkInSummary = ({ productItem, order, orderId }) => {
    const [downloadToolTipOpen, setDownloadToolTipOpen] = useState({});

    const downloadToolTipToggle = (productId) => {
        setDownloadToolTipOpen(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    return (
        <>
            <span
                className='blue-hyperlink-text'
                onMouseEnter={() => downloadToolTipToggle(productItem._id)}
                onMouseLeave={() => downloadToolTipToggle(productItem._id)}
                id={`downloadToolTip-${productItem._id}`}
            >
                Click to Download
            </span>

            <Tooltip
                isOpen={downloadToolTipOpen[productItem._id]}
                target={`downloadToolTip-${productItem._id}`}
                toggle={() => downloadToolTipToggle(productItem._id)}
                placement="bottom"
            >
                Sorry, downloads are currently unavailable!
            </Tooltip>
        </>
    )
}

export default DownloadLinkInSummary