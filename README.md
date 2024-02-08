# Fetsy Shop Online (E-commerce Frontend Code)

Explore the various facets of online commerce: as a seller (admin), consumer (user), and a random person lurking waiting to sign up and join in on the fun!

This MERN (MongoDB - Express - React - Node.JS) Application incorporates backend techniques (admin authorization, user authentication, password hashing, session) along with a seamless, clean React frontend. My project closely models [my actual Etsy shop] (https://www.etsy.com/shop/DigiWitz).

## Purpose for the Project

After graduating from Nucamp's Full Stack Bootcamp (with honors, shameless brag :D), I wanted to further hone my full stack web developer skills. Specifically, I wanted to master database interactions, password hashing, session and cookie management, and user/admin authentication. I know that these are valuable skills on any website, so what better way to gain experience in the form of an online shop! And I knew this was perfect for me because I already run an Etsy shop myself.

Once my shop picks up, I may perhaps transition to my own site where I can charge lower prices (as there wouldn't be any Etsy fees). Through that, I could gain more customers and therefore more profit. 

## Frontend Tools, Services, and Technologies used:
### React
React is a popular JavaScript library for building user interfaces. React is useful for creating a single-page application in which the current web page can generate new data without needing to load entire new pages, leading to a faster, more user-friendly experience. Additionally, React helps in creating reusable UI components, making it easier to manage and update the interface of your website efficiently. For instance, components were especially useful when displaying the product information in the Orders, Favorites, Cart, and Checkout pages, as the UI is very similar across all pages.

### Cloudinary
Cloudinary is a cloud-based image and video management service. For my site, it's used to store image data for the products created by the admin. As the main media storage, Cloudinary ensures that images can be loaded quickly onto my site. Posting and deleting photos requires the image to be appended to a "FormData" object along with a unique "upload preset". The URL is also specific and is stored in my ENV file for security purposes.

### Fetch API / Promises / Async + Await
The fetch API is the interface used to fetch resources from a server. The fetch method returns a Promise that resolves with a Response Object that contains information about the data, headers, status, etc. The Response Object needs to be converted to JSON format with json(). If the Promise is rejected, then the error is handled in a "catch" block.

In summary, given the asynchronous nature of fetch calls, the fetch method returns a Promise either resolved with a Response Object or rejected and handled in the "catch" statement.

### Axios
Axios is a popoular HTTP client that simplifies the fetch API syntax. Writing methods is simpler and the Response Object is automatically parsed to JSON.

### React hooks
The following React hooks were used:

#### useState
useState is a React Hook that allows functional components to manage state. It helps your website remember and track changes in data, contributing to a more responsive user experience. For example, useState is used to keep track of the number of items in your cart, the data of the product after a fetch call, and the data in forms.

#### useEffect
useEffect is another React Hook that performs side effects in functional components. It's useful for tasks like data fetching, setting up subscriptions, or manually changing the DOM in response to data changes. For this site, useEffect was primarily used to handle fetch calls.

#### useContext
useContext is a React Hook that simplifies the process of passing data throughout your component tree. It allows components to access shared information without manually passing props down the hierarchy. useContext was useful to manage data across different pages of the site: for example, the "SingleProduct.JS" page can add an item to a cart, which needs to be updated in the cart icon in the navbar. Instead of passing this prop across different components, the cart products are managed in a "CartContext.js" file.

### Conditional Rendering
Conditional rendering involves showing or hiding components based on certain conditions. It allows your website to dynamically display content, making the user interface more adaptive and context-aware. Conditional rendering was useful to display messages such as "Your cart is empty" if you had no items in your cart.

## Backend Tools, Services, and Technologies used:
### Node.JS
As the runtime environment, Node.js allows server-side JavaScript execution. It's used to handle server logic and manage backend functionality.

### Express
Express, a web application framework for Node.js, simplifies the creation of robust APIs and web applications by providing a set of features and tools, streamlining the development process. For example, routing is simpler, adding middlewares helps modularize and reuse code, http utility methods like res.send() and res.json() make life much easier, etc.

### MongoDB
MongoDB, a NoSQL (Not Only SQL) database, is employed for data storage and management. Unlike traditional relational databases (SQL), MongoDB stores data in flexible, JSON-like BSON (Binary JSON) documents, which can have varying structures, overall being more dynamic and scalable for data storage compared to SQL databases.

### Mongoose
Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js, providing a higher-level, schema-based abstraction over MongoDB. Mongoose makes it easier to interact with the database using JavaScript.

### Schemas and Models
In Mongoose, schemas define the structure of the document that can be stored in a MongoDB collection (specifying fields, data types, constraints, etc.). Schemas provide a level of data validation and help maintain consistency.

A model is a JavaScript class created from a schema, representing a collection in MongoDB. Models provide an interface for querying and interacting with the documents in that collection, enabling CRUD (Create, Read, Update, Delete) operations. It abstracts away much of the complexity of working directly with the MongoDB Driver.

So, in summary, the schema defines the structure of your data, and the model is a programmatic way to interact with that data structure in MongoDB.

### Sessions
Sessions allow a server to store and maintain user-specific information across multiple requests and responses. After login, the server assigns a unqiue identifier (session ID) to the user, which is then stored in the browser's cookie. Then, in subsequent requests to the server, the server can authenticate the user with the session ID stored in MongoDB. After logout, the session is destroyed.

### JSON Web Token (JWT)
JWTs provide a means of user authentication by creating tokens that store user information. These tokens are crucial for secure and efficient user authorization processes.

I initially used JWT as my primary form of authentication, but later switched to Sessions for its security. JWT's cannot be destroyed, invalidated, or modified until expiration. This is problematic because I wanted a user's credential to be destroyed after logout; but in the case of JWT's, this cannot be the case.

### Passport
Passport.js is a middleware for Node.js that simplifies the authentication process in web applications. It supports various authentication strategies, including local, OAuth, and OpenID, allowing developers to choose the method that best suits their application.

### Admin Authorization
Admin authorization restricts access to specific functionalities and routes, ensuring that only authorized administrators can perform administrative tasks within the application. In my app, there is only one admin (me!).

### User Authentication
User authentication verifies user identity, typically through a combination of sessions and JWTs. This process secures access to user-specific data and actions within the web application. As explained earlier, I used sessions as the primary form of authentication via browser cookies.

### Hashing and Salting (+ bcrypt)
Hashing is a one-way function that converts input data (the password) into a fixed-length string of characters - a hash code. Salting adds a unique random value to each password before hashing, which makes it more secure. Salting is performed before hashing.

For example, If a user has the password "password123" and a random salt "s1a2l3t4", the actual password passed to the hashing function would be "password123s1a2l3t4".

Bcrypt is a widely used password-hashing function designed to securely store passwords. It employs salting, and overall helps resist attacks.

### HTTP Requests (GET, PUT, DELETE, POST)
HTTP methods such as GET, PUT, DELETE, and POST are fundamental for RESTful API operations. They define the actions performed on data, ensuring a standardized approach to data manipulation.

### Cross-Origin Resource Sharing (CORS)
CORS, or Cross-Origin Resource Sharing, controls domain access to resources, preventing unauthorized access from different domains. It enhances security by defining which domains can interact with the web application's resources.


## Next Steps for the Project

1. Creating a "sale" function.
2. Having the ability to close the shop temporarily (or permanently, for that matter).
3. Create sections and product categories.
4. Provide a "forgot username" or "forgot password" function.
5. Search through orders and reviews.
6. (not coding related) Advertise my shop and drive some customers to this site.



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).