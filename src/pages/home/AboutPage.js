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
                        <h3 className='h3-about-page-top'>Why did I create this project?</h3>
                        <p>I created this project after I finished my full stack bootcamp course at Nucamp. I wanted to not only deepen my knowledge of React, but also incorporate backend techniques such as admin authorization, user authentication, password hashing, and sessions. Thus, I created this MERN (MongoDB, Express, React, Node.JS) project to incorporate both the frontend and the backend to work seamlessly together. Because I also run an Etsy shop on the side, I figured creating my own e-commerce website was a great way to allow an admin to manage the site, users to buy products and leave reviews, and general non-users to still access the shop with limited features. </p>

                        <h3 className='h3-about-page'>Why "Fetsy"?</h3>
                        <p>I was inspired to model Etsy's web layout and design as it looks polished, modern, and clean. I wanted to call it "Fetsy" as a "<u>F</u>ake <u>Etsy</u>" Shop, but given that I actually have an Etsy shop, it didn't seem right to call it "fake". Conveniently, I considered it then as "<u>F</u>rank's <u>Etsy</u>" Shop. But whatever you may call it, I feel like Fetsy has a nice ring to it -- but perhaps I have conditioned my mind to think this way.</p>

                        <h3 className='h3-about-page'>How do I use this site??</h3>
                        <p>If you scroll a bit further, I have different sign-in options listed to demonstrate how to use this site from different user logins.</p>

                        <h3 className='h3-about-page'>Where can I find your Github and Etsy Shop?</h3>
                        <p>To view the Github for the frontend (client) code, <a href='https://github.com/fjl005/ecommerce-frontend/tree/master' target='_blank'> click here</a>.</p>
                        <p>To view the Github for the backend (server) code, <a href='https://github.com/fjl005/ecommerce-backend/tree/master' target='_blank'>click here</a>.</p>
                        <p><a href='https://www.etsy.com/shop/DigiWitz' target='_blank'>This link</a> will take you to DigiWitz, my actual Etsy Shop! I sell digital products and templates such as birthday cards and Airbnb welcome signs.</p>

                        <h3 className='h3-about-page'>What are the next steps for this site?</h3>
                        <p>Ideally, I'd like to branch out from Etsy and run my own site so that I do not have to mark up my prices (as Etsy has a lot of fees). However, my current priority is to focus on my main career path, which is becoming a full stack developer. </p>

                        <p>But with that said, some things I'd like to eventually accomplish with this site include:</p>
                        <ul>
                            <li>Creating a "sale" function.</li>
                            <li>Having the ability to close the shop temporarily (or permanently, for that matter).</li>
                            <li>Create sections and product categories.</li>
                            <li>Provide a "forgot username" or "forgot password" function.</li>
                            <li>Search through orders and reviews.</li>
                            <li>(not coding related) Advertise my shop and drive some customers to this site.</li>
                        </ul>

                        <LoginInstructions />

                        <h2 className='text-center h2-about-m-top'>Frontend Tools, Services, and Technologies used:</h2>

                        <h3 className='h3-about-page-top'>React</h3>
                        <p>React is a popular JavaScript library for building user interfaces. React is useful for creating a single-page application in which the current web page can generate new data without needing to load entire new pages, leading to a faster, more user-friendly experience. Additionally, React helps in creating reusable UI components, making it easier to manage and update the interface of your website efficiently. For instance, components were especially useful when displaying the product information in the Orders, Favorites, Cart, and Checkout pages, as the UI is very similar across all pages.</p>

                        <h3 className='h3-about-page'>Cloudinary</h3>
                        <p>Cloudinary is a cloud-based image and video management service. For my site, it's used to store image data for the products created by the admin. As the main media storage, Cloudinary ensures that images can be loaded quickly onto my site. Posting and deleting photos requires the image to be appended to a "FormData" object along with a unique "upload preset". The URL is also specific and is stored in my ENV file for security purposes.</p>

                        <h3 className='h3-about-page'>Fetch API / Promises / Async + Await</h3>
                        <p>The fetch API is the interface used to fetch resources from a server. The fetch method returns a Promise that resolves with a Response Object that contains information about the data, headers, status, etc. The Response Object needs to be converted to JSON format with json(). If the Promise is rejected, then the error is handled in a "catch" block.</p>
                        <p>In summary, given the asynchronous nature of fetch calls, the fetch method returns a Promise either resolved with a Response Object or rejected and handled in the "catch" statement.</p>

                        <h3 className='h3-about-page'>Axios</h3>
                        <p>Axios is a popoular HTTP client that simplifies the fetch API syntax. Writing methods is simpler and the Response Object is automatically parsed to JSON.</p>

                        <h3 className='h3-about-page'>useState</h3>
                        <p>useState is a React Hook that allows functional components to manage state. It helps your website remember and track changes in data, contributing to a more responsive user experience. For example, useState is used to keep track of the number of items in your cart, the data of the product after a fetch call, and the data in forms.</p>

                        <h3 className='h3-about-page'>useEffect</h3>
                        <p>useEffect is another React Hook that performs side effects in functional components. It's useful for tasks like data fetching, setting up subscriptions, or manually changing the DOM in response to data changes. For this site, useEffect was primarily used to handle fetch calls.</p>

                        <h3 className='h3-about-page'>useContext</h3>
                        <p>useContext is a React Hook that simplifies the process of passing data throughout your component tree. It allows components to access shared information without manually passing props down the hierarchy. useContext was useful to manage data across different pages of the site: for example, the "SingleProduct.JS" page can add an item to a cart, which needs to be updated in the cart icon in the navbar. Instead of passing this prop across different components, the cart products are managed in a "CartContext.js" file.</p>

                        <h3 className='h3-about-page'>Conditional Rendering</h3>
                        <p>Conditional rendering involves showing or hiding components based on certain conditions. It allows your website to dynamically display content, making the user interface more adaptive and context-aware. Conditional rendering was useful to display messages such as "Your cart is empty" if you had no items in your cart.</p>



                        <h2 className='text-center h2-about-m-top'>Backend Tools, Services, and Technologies used:</h2>

                        <h3 className='h3-about-page-top'>Node.JS</h3>
                        <p>As the runtime environment, Node.js allows server-side JavaScript execution. It's used to handle server logic and manage backend functionality.</p>

                        <h3 className='h3-about-page'>Express</h3>
                        <p>Express, a web application framework for Node.js, simplifies the creation of robust APIs and web applications by providing a set of features and tools, streamlining the development process. For example, routing is simpler, adding middlewares helps modularize and reuse code, http utility methods like res.send() and res.json() make life much easier, etc.</p>

                        <h3 className='h3-about-page'>MongoDB</h3>
                        <p>MongoDB, a NoSQL (Not Only SQL) database, is employed for data storage and management. Unlike traditional relational databases (SQL), MongoDB stores data in flexible, JSON-like BSON (Binary JSON) documents, which can have varying structures, overall being more dynamic and scalable for data storage compared to SQL databases.</p>

                        <h3 className='h3-about-page'>Mongoose</h3>
                        <p>Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js, providing a higher-level, schema-based abstraction over MongoDB. Mongoose makes it easier to interact with the database using JavaScript. </p>

                        <h3 className='h3-about-page'>Schemas and Models</h3>
                        <p>In Mongoose, schemas define the structure of the document that can be stored in a MongoDB collection (specifying fields, data types, constraints, etc.). Schemas provide a level of data validation and help maintain consistency.</p>

                        <p>A model is a JavaScript class created from a schema, representing a collection in MongoDB. Models provide an interface for querying and interacting with the documents in that collection, enabling CRUD (Create, Read, Update, Delete) operations. It abstracts away much of the complexity of working directly with the MongoDB Driver.</p>

                        <p>So, in summary, the schema defines the structure of your data, and the model is a programmatic way to interact with that data structure in MongoDB.</p>

                        <h3 className='h3-about-page'>Sessions</h3>
                        <p>Sessions allow a server to store and maintain user-specific information across multiple requests and responses. After login, the server assigns a unqiue identifier (session ID) to the user, which is then stored in the browser's cookie. Then, in subsequent requests to the server, the server can authenticate the user with the session ID stored in MongoDB. After logout, the session is destroyed.</p>

                        <h3 className='h3-about-page'>JSON Web Token (JWT)</h3>
                        <p>JWTs provide a means of user authentication by creating tokens that store user information. These tokens are crucial for secure and efficient user authorization processes.</p>

                        <p>I initially used JWT as my primary form of authentication, but later switched to Sessions for its security. JWT's cannot be destroyed, invalidated, or modified until expiration. This is problematic because I wanted a user's credential to be destroyed after logout; but in the case of JWT's, this cannot be the case.</p>

                        <h3 className='h3-about-page'>Passport</h3>
                        <p>Passport.js is a middleware for Node.js that simplifies the authentication process in web applications. It supports various authentication strategies, including local, OAuth, and OpenID, allowing developers to choose the method that best suits their application.</p>

                        <h3 className='h3-about-page'>Admin Authorization</h3>
                        <p>Admin authorization restricts access to specific functionalities and routes, ensuring that only authorized administrators can perform administrative tasks within the application. In my app, there is only one admin (me!).</p>

                        <h3 className='h3-about-page'>User Authentication</h3>
                        <p>User authentication verifies user identity, typically through a combination of sessions and JWTs. This process secures access to user-specific data and actions within the web application. As explained earlier, I used sessions as the primary form of authentication via browser cookies.</p>

                        <h3 className='h3-about-page'>Hashing and Salting (+ bcrypt)</h3>
                        <p>Hashing is a one-way function that converts input data (the password) into a fixed-length string of characters - a hash code. Salting adds a unique random value to each password before hashing, which makes it more secure. Salting is performed before hashing.</p>
                        <p>For example, If a user has the password "password123" and a random salt "s1a2l3t4", the actual password passed to the hashing function would be "password123s1a2l3t4".</p>

                        <p>Bcrypt is a widely used password-hashing function designed to securely store passwords. It employs salting, and overall helps resist attacks.</p>

                        <h3 className='h3-about-page'>HTTP Requests (GET, PUT, DELETE, POST)</h3>
                        <p>HTTP methods such as GET, PUT, DELETE, and POST are fundamental for RESTful API operations. They define the actions performed on data, ensuring a standardized approach to data manipulation.</p>

                        <h3 className='h3-about-page'>Cross-Origin Resource Sharing (CORS)</h3>
                        <p>CORS, or Cross-Origin Resource Sharing, controls domain access to resources, preventing unauthorized access from different domains. It enhances security by defining which domains can interact with the web application's resources.</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AboutPage;