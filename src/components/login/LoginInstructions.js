import { Button } from 'reactstrap';
import { useState } from 'react';

const LoginInstructions = () => {

    const [showPW, setShowPW] = useState(false);
    const [pwBtnText, setPwBtnText] = useState('Show Password');

    const showPassword = () => {
        if (showPW) {
            setPwBtnText('Show Password');
        } else {
            setPwBtnText('Hide Password');
        }

        setShowPW(!showPW);
    }



    return (
        <>
            <h2 className='text-center' style={{ marginTop: '20px' }}>Different Sign In Options:</h2>
            <h3 className='h3-about-page'>(1) Admin</h3>
            <h5>The admin can do everything a user can, plus the following:</h5>
            <ul>
                <li>Add a new product, posting most of its data to MongoDB and the images to Cloudinary.</li>
                <li>Update either one or multiple products at once.</li>
                <li>Delete either one or multiple products at once.</li>
                <li>Have access to all reviews and orders, but cannot update them because that would be cheating!</li>
                <li>Keep track of all billing.</li>
            </ul>
            <h6>Username: frank</h6>
            <h6>Password:
                {showPW ? (
                    <span> password</span>
                ) : (
                    <span> ********</span>
                )}
            </h6>
            <Button style={{ padding: '5px' }} onClick={() => showPassword()}>{pwBtnText}</Button>


            <h3 className='h3-about-page'>(2) Pre-existing User</h3>
            <h5>This user already has orders, reviews, and items in their Favorites and Cart.</h5>
            <h6>Username: </h6>
            <h6>Password: </h6>


            <h3 className='h3-about-page'>(3) User that you created!</h3>
            <p>Use the login information that you created. Unfortunately, I do not have a "forgot username" or "forgot password" function yet, but I hope to do so in the future!</p>
            <h3 className='h3-about-page'>(4) Not logged in user.</h3>
            <p>They can still access the products, but cannot add anything to their cart or favorites. And therefore, they cannot have any orders or reviews. To do so, you must sign up!</p>
        </>
    )
}

export default LoginInstructions