<h2 className='d-flex align-items-center'>Other Reviews from this shop
    <span style={{ display: 'inline-block', fontSize: '20px', margin: '0px 10px' }}> | </span>
    <span style={{ fontSize: '20px', marginRight: '10px' }}>{averageRating}</span>
    <StarReviews rating={averageRating} />
    <span style={{ fontSize: '20px' }}>({reviewsData.length})</span>
</h2>

{
    reviewsData.slice(startReviewIdx, endReviewIdx).map((review, idx) => (
        <div key={idx}>
            <h3>Rating: {review.rating}</h3>
            <StarReviews rating={review.rating} />
            <p>{review.description}</p>
            <p>Purchased Item: {review.product}</p>
            <p>{review.name}, {review.date}</p>
            <div className='line-between-reviews'></div>
        </div>
    ))
}

<div className='d-flex'>
    {/* Prev Button */}
    {totalPages > 1 && (
        <div
            className={`circle-review-nav ${currentPage === 1 && 'circle-review-nav-blocked'}`}
            onClick={() => {
                pageChangePrev(currentPage - 1);
                if (currentPage > 2) {
                    setMidBtn(currentPage - 1);
                }
            }}
        >Prev</div>
    )}


    {/* First Page */}
    <div
        className={`circle-review-nav ${currentPage === 1 && 'circle-review-nav-blocked'}`}
        onClick={() => {
            setPageSpecific(1);
            setMidBtn(2);
        }}
        style={{
            border: currentPage === 1 ? '2px solid black' : 'none'
        }}
    >1</div>


    {/* ... Part 1 */}
    {currentPage > 2 && (
        <p style={{ fontSize: '25px' }}>...</p>
    )}

    {/* Mid Button */}
    {totalPages > 1 && (
        <div
            className={`circle-review-nav ${currentPage === midBtn && 'circle-review-nav-blocked'}`}
            onClick={() => pageChangeMidBtn(midBtn)}
            style={{
                border: currentPage === midBtn ? '2px solid black' : 'none'
            }}
        >{midBtn}</div>
    )}


    {/* ... Part 2 */}
    {midBtn + 1 < totalPages && (
        <p style={{ fontSize: '25px' }}>...</p>
    )}

    {/* Last Page */}
    {totalPages > 2 && (
        <div
            className={`circle-review-nav ${currentPage === totalPages && 'circle-review-nav-blocked'}`}
            onClick={() => {
                setPageSpecific(totalPages);
                setMidBtn(totalPages - 1);
            }}
            style={{
                border: currentPage === totalPages ? '2px solid black' : 'none'
            }}
        >{totalPages}</div>
    )}


    {/* Next Page */}
    {totalPages > 1 && (
        <div
            className={`circle-review-nav ${currentPage === totalPages && 'circle-review-nav-blocked'}`}
            onClick={() => {
                pageChangeNext(currentPage + 1);
                if (currentPage + 1 < totalPages) {
                    setMidBtn(currentPage + 1);
                }
            }}
        >Next</div>
    )}

</div>