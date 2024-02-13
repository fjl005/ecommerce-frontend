

const FiveStarGenerator = ({ starRating, editRating, setStarRating }) => {
    const starArray = Array(5).fill(null);

    for (let i = 1; i < 6; i++) {
        // If the rating difference is >= 0, then give a 1 (to represent a solid star).
        if (starRating >= i) {
            starArray[i - 1] = 1;
        } else if (starRating - i > -1) {
            // If the rating is between 0 and 1 (aka, a 4.3 star rating - 5th spot is a -0.7 difference), then we will store that difference as a positive number. Because of the font appearance, we will round to the nearest 0.25.
            starArray[i - 1] = Math.round((i - starRating) * 10) / 10;
        }
        // Otherwise, the rating is a difference greater than or equal to -1. Ex: 2 star rating vs the 3rd spot is a difference of -1. So, it'll be an empty star. Since the array is initialized as a null entry, we don't need to do anything at this point.
    }


    return (
        <div style={{ fontSize: '24px' }}>
            {starArray.map((star, idx) => (
                <div key={idx} style={{ display: 'inline-block' }}>
                    {star === 1 ? (
                        <i
                            className="fa-solid fa-star"
                            onClick={() => {
                                if (editRating) {
                                    setStarRating(idx + 1);
                                }
                            }}
                            style={{ cursor: editRating ? 'pointer' : 'auto' }}></i>
                    ) : star === null ? (
                        <i
                            className="fa-regular fa-star"
                            onClick={() => {
                                if (editRating) {
                                    setStarRating(idx + 1);
                                }
                            }}
                            style={{ cursor: editRating ? 'pointer' : 'auto' }}></i>
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
        </div>
    )
};

export default FiveStarGenerator;