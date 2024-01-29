import React from 'react'
import frankPhoto from '../../img/frankPhoto.png'

const MeetTheSeller = () => {
    return (
        <div className='d-flex align-items-center'>
            <img
                src={frankPhoto}
                alt='Image of Frank'
                style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                }}
            />
            <div className='d-flex flex-column' style={{ marginLeft: '20px' }}>
                <h5>Frank Lee</h5>
                <h6 style={{ marginBottom: '0px' }}>Owner of Fetsy</h6>
            </div>
        </div>
    )
}

export default MeetTheSeller