
const Technologies = ({ details, techType }) => {
    return (
        <>
            <h2 className='text-center h2-about-m-top'>
                {`${techType} Tools, Services, and Technologies used:`}
            </h2>

            {details.map((details, idx) => (
                <div key={idx}>
                    <h3 className='h3-about-page-top'>{details.heading}</h3>
                    {details.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            ))}
        </>
    )
}

export default Technologies