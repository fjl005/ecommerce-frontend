import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

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
        // Otherwise, we leave the spot as null. A 1 star rating will have 4 empty white stars. 
    }

    const editing = (index) => {
        if (editRating) setStarRating(index + 1);
    }

    return (
        <div style={{ fontSize: '1.5rem' }}>
            {starArray.map((star, idx) => (
                <div key={idx} style={{ display: 'inline-block' }}>
                    {star > 0.75 ? (
                        <FontAwesomeIcon
                            icon={faStar}
                            onClick={() => editing(idx)}
                            style={{ cursor: editRating ? 'pointer' : 'auto' }} />
                    ) : star > 0.25 ? (
                        <i className="fa-regular fa-star" style={{ position: 'relative', }}>
                            <i className="fa-solid fa-star" style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                clipPath: `inset(0 ${star * 100}% 0 0)`,
                            }}></i>
                        </i>
                    ) : (
                        <FontAwesomeIcon
                            icon={faStarEmpty}
                            onClick={() => editing(idx)}
                            style={{ cursor: editRating ? 'pointer' : 'auto' }} />
                    )}
                </div>
            ))}
        </div>
    )
};

export default FiveStarGenerator;