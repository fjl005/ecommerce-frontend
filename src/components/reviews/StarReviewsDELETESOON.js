const StarReviews = ({ rating }) => {
    const starArray = Array(5).fill(null);

    // We use i-1 because we are setting up our for loop at 1, not 0. We are setting it up at 1 because we'll consider the first star (idx 0) as 1. However, when updating the array, we will need to subtract 1 to account for this.
    for (let i = 1; i < 6; i++) {
        // If the rating difference is >= 0, then give a 1 (to represent a solid star). Ex: 4 star rating vs the 4th spot is a difference of 0 (4-4), so it'll be a full star.
        if (rating - i >= 0) {
            starArray[i - 1] = 1;
        } else if (rating - i > -1) {
            // If the rating is between 0 and 1 (aka, a 4.3 star rating - 5th spot is a -0.7 difference), then we will store that difference as a positive number. Because of the font appearance, we will round to the nearest 0.25.
            starArray[i - 1] = Math.round((i - rating) * 10) / 10;
            // starArray[i - 1] = i - rating;
        }
        // Otherwise, the rating is a difference greater than or equal to -1. Ex: 2 star rating vs the 3rd spot is a difference of -1. So, it'll be an empty star. Since the array is initialized as a null entry, we don't need to do anything at this point.
    }

    return (
        <>
            {starArray.map((star, idx) => (
                <div key={idx} style={{ display: 'inline-block', fontSize: '24px' }}>
                    {star === 1 ? (
                        <i className="fa-solid fa-star"></i>
                    ) : star === null ? (
                        <i className="fa-regular fa-star"></i>
                    ) : (
                        <i className="fa-regular fa-star" style={{ position: 'relative', }}>
                            <i className="fa-solid fa-star" style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                clipPath: `inset(0 ${star * 100}% 0 0)`,
                            }}></i>
                        </i>
                    )}
                </div>
            ))}
        </>
    )
}

export default StarReviews;