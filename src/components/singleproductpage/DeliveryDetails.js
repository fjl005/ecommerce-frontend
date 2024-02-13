const DeliveryDetails = ({ props }) => {
    const productType = props;

    return (
        <>
            {productType === 'Digital Download' ? (
                <>
                    <h5>Instant Download</h5>
                    <p> Your files will be available to download once payment is confirmed. Instant download items cannot be returned or exchanged. Please contact the seller about any problems with your order.</p>
                </>
            ) : (
                <>
                    <h5>Shipping</h5>
                    <p> After payment is confirmed, the product will be shipped. Please expect the item to deliver 5-7 business days from purchase date.</p>
                </>
            )}
        </>
    )
}

export default DeliveryDetails