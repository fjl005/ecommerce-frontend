

const FiveStarGenerator = ({ starRating, editRating, setStarRating }) => {
    const starRatingValues = [1, 2, 3, 4, 5];

    return (
        <div style={{ fontSize: '24px' }}>
            {starRatingValues.map((value) => (
                value <= starRating ? (
                    <i
                        key={value}
                        className="fa-solid fa-star"
                        onClick={() => {
                            if (editRating) {
                                setStarRating(value);
                            }
                        }}
                        style={{ cursor: editRating ? 'pointer' : 'auto' }}
                    ></i>
                ) : (
                    <i
                        key={value}
                        className="fa-regular fa-star"
                        onClick={() => {
                            if (editRating) {
                                setStarRating(value);
                            }
                        }}
                        style={{ cursor: editRating ? 'pointer' : 'auto' }}
                    ></i>
                )
            ))}
        </div>
    )
};

export default FiveStarGenerator;