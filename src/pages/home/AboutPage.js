import { Container, Row, Col } from "reactstrap"
import LoginInstructions from "../../components/login/LoginInstructions"
import NavbarApp from "../../components/navbar/NavbarApp";

const AboutPage = () => {
    return (
        <>
            <NavbarApp currentPage='About' />
            <Container>
                <Row>
                    <Col>
                        <h1>About this Project</h1>
                        <h2 className='text-center'>General FAQ:</h2>
                        <h3 className='h3-about-page'>Why did I create this project?</h3>
                        <p>I created this project after I finished my full stack bootcamp course at Nucamp. I wanted to not only deepen my knowledge of React, but also incorporate backend techniques such as admin authorization, user authentication, password hashing, and sessions. Thus, I created this MERN (MongoDB, Express, React, Node.JS) project to incorporate both the frontend and the backend to work seamlessly together. Because I also run an Etsy shop on the side, I figured that my own e-commerce website was a great way to allow an admin to manage the site, users to buy products and leave reviews, and general non-users to still access the shop with limited features. </p>

                        <h3 className='h3-about-page'>Why "Fetsy"?</h3>
                        <p>Honestly, I was inspired to model Etsy's web layout and design as it looks really clean. I wanted to call it "Fetsy" as a "<u>F</u>ake <u>Etsy</u>" Shop, but given that I actually have an Etsy shop, it didn't seem right to call it "fake". Conveniently, I considered it then as "<u>F</u>rank's <u>Etsy</u>" Shop. But whatever you may call it, I feel like Fetsy has a nice ring to it -- but perhaps I have conditioned my mind to think this way.</p>

                        <h3 className='h3-about-page'>How do I use this site??</h3>
                        <p>If you scroll a bit further, I have different sign-in options listed to show you the different components of this site. .</p>

                        <h3 className='h3-about-page'>Where can I find your Github and Etsy Shop?</h3>
                        <p>To view the Github for the frontend (client) code, <a href='https://github.com/fjl005/ecommerce-frontend/tree/master' target='_blank'> click here</a>.</p>
                        <p>To view the Github for the backend (server) code, <a href='https://github.com/fjl005/ecommerce-backend/tree/master' target='_blank'>click here</a>.</p>
                        <p><a href='https://www.etsy.com/shop/DigiWitz' target='_blank'>This link</a> will take you to DigiWitz, my actual Etsy Shop! I sell digital products and templates such as birthday cards and Airbnb welcome signs.</p>

                        <h3 className='h3-about-page'>What are the next steps for this site?</h3>
                        <p>Ideally, I'd like to branch out from Etsy and run my own site so that I do not have to mark up my prices (as Etsy has a lot of fees). However, my current priority is to focus on my main career path, which is becoming a full stack developer. </p>

                        <p>Though with that said, some things I'd like to eventually accomplish with this site, include:</p>
                        <ul>
                            <li>Creating a "sale" function.</li>
                            <li>Having the ability to close the shop temporarily (or permanently, for that matter).</li>
                            <li>Create sections and product categories.</li>
                            <li>Provide a "forgot username" or "forgot password" function.</li>
                            <li>Search through orders and reviews.</li>
                            <li>(not coding related) Advertise my shop and drive some customers to this site.</li>
                        </ul>

                        <LoginInstructions />

                        <h2 className='text-center'>Frontend Technologies used:</h2>
                        <h3 className='h3-about-page'>React</h3>
                        <h3 className='h3-about-page'>Cloudinary</h3>
                        <h3 className='h3-about-page'>Fetch API, Axios</h3>
                        <h3 className='h3-about-page'>useState</h3>
                        <h3 className='h3-about-page'>useEffect</h3>
                        <h3 className='h3-about-page'>useContext</h3>
                        <h3 className='h3-about-page'>Conditional Rendering</h3>

                        <h2 className='text-center'>Backend Technologies used:</h2>
                        <h3 className='h3-about-page'>Node.JS</h3>
                        <h3 className='h3-about-page'>Express</h3>
                        <h3 className='h3-about-page'>MongoDB / Mongoose</h3>
                        <h3 className='h3-about-page'>Sessions</h3>
                        <h3 className='h3-about-page'>JSON Web Token (JWT)</h3>
                        <h3 className='h3-about-page'>Admin Authorization</h3>
                        <h3 className='h3-about-page'>User Authentication</h3>
                        <h3 className='h3-about-page'>Hashing and Salting</h3>
                        <h3 className='h3-about-page'>HTTP Requests (GET, PUT, DELETE, POST)</h3>
                        <h3 className='h3-about-page'>CORS</h3>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AboutPage;