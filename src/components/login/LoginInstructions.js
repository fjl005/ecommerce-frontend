import LoginDetailsPerUser from './LoginDetailsPerUser';

const LOGIN = {
    admin: {
        username: 'frank',
        password: 'password',
    },
    existingUser: {
        username: 'marshall',
        password: 'mathers',
    }
};

const loginDetails = [
    {
        h3Heading: '(1) Admin',
        autofill: {
            exists: true,
            username: LOGIN.admin.username,
            password: LOGIN.admin.password,
            buttonText: 'Admin Autofill',
        },
        h5Heading: 'The admin can do everything a user can, plus the following:',
        list: {
            exists: true,
            bulletpoints: [
                'Add a new product, posting most of its data to MongoDB and the images to Cloudinary.',
                'Update either one or multiple products at once.',
                'Delete either one or multiple products at once.',
                'Have access to all reviews and orders, but cannot update them because that would be cheating!',
                'Keep track of all billing.',
            ]
        },
        pText: null,
    },
    {
        h3Heading: '(2) Pre-existing User',
        autofill: {
            exists: true,
            username: LOGIN.existingUser.username,
            password: LOGIN.existingUser.password,
            buttonText: 'User Autofill',
        },
        h5Heading: 'This user already has orders, reviews, and items in their Favorites and Cart. These features are unavailable for a user not logged in.',
        list: {
            exists: false,
        },
        pText: null,
    },
    {
        h3Heading: '(3) User that you created!',
        autofill: {
            exists: false
        },
        h5Heading: null,
        list: {
            exists: false,
        },
        pText: `Use the login information that you created. Currently, I do not have a "forgot username" or "forgot password" function yet, but I hope to do so in the future!`,
    },
    {
        h3Heading: '(3) User that you created!',
        autofill: {
            exists: false
        },
        h5Heading: null,
        list: {
            exists: false,
        },
        pText: `They can still access the products, but cannot add anything to their cart or favorites. And therefore, they cannot have any orders or reviews. To do so, you must sign up!`,
    }
];

const LoginInstructions = ({ loginPage }) => {
    return (
        <>
            <h2 className='text-center h2-about-m-top'>Different Sign In Options:</h2>

            {loginDetails.map((details, idx) => (
                <LoginDetailsPerUser
                    key={idx}
                    details={details}
                    loginPage={loginPage}
                />
            ))}
        </>
    )
};

export default LoginInstructions;