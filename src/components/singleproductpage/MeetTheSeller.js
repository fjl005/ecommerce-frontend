import React from 'react'
import frankPhoto from '../../img/frankPhoto.png'

const MeetTheSeller = () => {
    return (
        <div className='d-flex align-items-center'>
            <img
                src={frankPhoto}
                alt='Frank the Seller'
                className='meet-seller-image'
            />
            <div className='d-flex flex-column ml-3'>
                <h4>Frank Lee</h4>
                <h5 className='mb-0'>Owner of Fetsy</h5>
            </div>
        </div>
    )
}

export default MeetTheSeller