export const reviewsData = [
    {
        name: 'cindy',
        rating: 5,
        product: 'airbnb template',
        description: 'great product 10/10',
        date: 'March 15 2023',
    },
    {
        name: 'angela',
        rating: 4,
        product: 'airbnb template',
        description: 'good product',
        date: 'March 15 2023',

    }
];

const totalRatingSum = reviewsData.reduce((sum, review) => sum + review.rating, 0);


export const averageRating = totalRatingSum / reviewsData.length;