const StarReviews = ({ rating }) => {
    const partialStarRating = rating % 1;
    const starArray = Array(5).fill(null);

    for (let i = 1; i < 6; i++) {
        // If the rating difference is >= 0, then give a 1 (to represent a solid star). Ex: 4 star rating vs the 4th spot is a difference of 0 (4-4), so it'll be a full star.
        if (rating - i >= 0) {
            // We use i-1 because we are setting up our for loop at 1, not 0.
            starArray[i - 1] = 1;
        } else if (rating - i > -1) {
            // If the rating is between 0 and 1 (aka, a 4.3 star rating - 5th spot is a -0.7 difference), then we will store that difference as a positive number. Because of the font appearance, we will round to the nearest 0.25.
            starArray[i - 1] = Math.round((i - rating) * 10) / 10;
            // starArray[i - 1] = i - rating;
        } else {
            // Otherwise, the rating is a difference greater than or equal to -1. Ex: 2 star rating vs the 3rd spot is a difference of -1. So, it'll be an empty star.
            // Since the array starts off as all entries being null, I don't think we need to do anything here.
        }
    }

    return (
        <>

            {starArray.map((star, idx) => (
                <div key={idx} style={{ display: 'inline-block', fontSize: '24px' }}>
                    {star === 1 ? (
                        <i class="fa-solid fa-star"></i>
                    ) : star === null ? (
                        <i class="fa-regular fa-star"></i>
                    ) : (
                        <i class="fa-regular fa-star" style={{ position: 'relative', }}>
                            <i class="fa-solid fa-star" style={{ position: 'absolute', top: 0, left: 0, clipPath: `inset(0 ${star * 100}% 0 0)` }}></i>
                        </i>

                    )}
                </div>
            ))}


            {/* We will create an array of 5 indices, each one being null. We set it to null because we don't really care about the contents of this array. It's only set up so that we can run this function five times as JSX doesn't take traditional for loops. The array map takes _ as the first argument because we will not be using the contents of the array (as they're all null). */}
            {/* {Array(5).fill(null).map((_, index) => { */}
            {/* Compare the index + 1 (which should be the star number out of five. ex: first star (index 0) will be counted as 1) to the rating. If the rating difference is 1 or greater (ex: 4 star rating vs 3 as the 3rd star to render), then we do a solid star. If the difference is less than 1 (ex: 4.3 rating vs 4th star to render), then we do a partial star. If the difference is greater than or equal to 1 (ex: 3 star rating vs 4th star to render), then it will simply be an empty star.  */}
            {/* rating - (index + 1) >= 1 ? (
                    <i class="fa-solid fa-star"></i>
                ) : rating - (index + 1) <= 1 ? (
                    <i class="fa-regular fa-star"></i>
                ) : (
                    <div style={{ position: 'relative', marginBottom: '20px', display: 'inline-block' }}>
                        <i class="fa-regular fa-star" style={{ position: 'absolute', top: 0, left: 0 }}></i>
                        <i class="fa-solid fa-star" style={{ position: 'absolute', top: 0, left: 0, clipPath: 'inset(0 40% 0 0)' }}></i>
                    </div>
                )
            })} */}
            {/* <div style={{ position: 'relative', marginBottom: '20px' }}>
                <i class="fa-regular fa-star" style={{ position: 'absolute', top: 0, left: 0 }}></i>
                <i class="fa-solid fa-star" style={{ position: 'absolute', top: 0, left: 0, clipPath: 'inset(0 40% 0 0)' }}></i>
            </div> */}
        </>
    )
}

export default StarReviews;