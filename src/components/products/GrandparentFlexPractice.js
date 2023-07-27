const GrandparentFlexPractice = ({ selectedProduct }) => {
    const imgArray = selectedProduct.img;

    return (
        <>
            {/* The below was used to help me understand the overflow Y situation.  */}
            <div className='grandparent' style={{
                backgroundColor: 'lightblue',
                padding: '30px',
                display: 'flex',
            }}>

                grandparent

                <div className='parent-one' style={{
                    backgroundColor: 'red',
                    padding: '10px',
                    position: 'relative',
                    overflowY: 'scroll',
                }}>
                    parent one



                    <div className='child-one' style={{
                        backgroundColor: 'green',
                        padding: '5px',
                        height: '1000px',
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        overflowY: 'scroll',
                    }}>

                        child one

                        {imgArray.map((image, idx) => (
                            <div key={idx} style={{ position: "relative", width: "100px", height: "100px" }}>
                                <img src={image} alt={`Image ${idx}`} style={{ position: 'absolute', width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        ))}

                        {imgArray.map((image, idx) => (
                            <img key={idx} src={image} alt={`Image ${idx}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                        ))}

                    </div>

                </div>

                <div className='parent-two' style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '20px',
                    height: '200px',
                }}>

                    parent two
                </div>
            </div>
        </>


    );
};

export default GrandparentFlexPractice;

