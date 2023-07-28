import { reviewsData, averageRating } from "./reviewsData";
import StarReviews from "./StarReviews";

const Reviews = () => {
    return (
        <>
            <h2 className='d-flex align-items-center'>Other Reviews from this shop
                <span style={{ display: 'inline-block', fontSize: '20px', margin: '0px 10px' }}> | </span>
                <StarReviews rating={averageRating} />
                <span style={{ fontSize: '20px' }}>({reviewsData.length})</span>
            </h2>
            {reviewsData.map((review, idx) => (
                <div key={idx}>
                    <h3>Rating: {review.rating}</h3>
                    <StarReviews rating={review.rating} />
                    <p>{review.description}</p>
                    <p>Purchased Item: {review.product}</p>
                    <p>star reviews component below</p>
                    <p>{review.name}, {review.date}</p>
                    <div className='line-between-reviews'></div>
                </div>
            ))}
        </>
    )
}

export default Reviews