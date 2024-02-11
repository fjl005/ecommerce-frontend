export const frontendTechnologies = [
    {
        heading: 'React',
        content: [
            "React is a popular JavaScript library for building user interfaces. React is useful for creating a single-page application in which the current web page can generate new data without needing to load entire new pages, leading to a faster, more user-friendly experience. Additionally, React helps in creating reusable UI components, making it easier to manage and update the interface of your website efficiently. For instance, components were especially useful when displaying the product information in the Orders, Favorites, Cart, and Checkout pages, as the UI is very similar across all pages."
        ]
    },
    {
        heading: 'Cloudinary',
        content: [
            "Cloudinary is a cloud-based image and video management service. For my site, it's used to store image data for the products created by the admin. As the main media storage, Cloudinary ensures that images can be loaded quickly onto my site. Posting and deleting photos requires the image to be appended to a 'FormData' object along with a unique 'upload preset'. The URL is also specific and is stored in my ENV file for security purposes."
        ]
    },
    {
        heading: 'Fetch API / Promises / Async + Await',
        content: [
            "The fetch API is the interface used to fetch resources from a server. The fetch method returns a Promise that resolves with a Response Object that contains information about the data, headers, status, etc. The Response Object needs to be converted to JSON format with json(). If the Promise is rejected, then the error is handled in a 'catch' block.",
            "In summary, given the asynchronous nature of fetch calls, the fetch method returns a Promise either resolved with a Response Object or rejected and handled in the 'catch' statement."
        ]
    },
    {
        heading: 'Axios',
        content: [
            "Axios is a popoular HTTP client that simplifies the fetch API syntax. Writing methods is simpler and the Response Object is automatically parsed to JSON."
        ]
    },
    {
        heading: 'useState',
        content: [
            "useState is a React Hook that allows functional components to manage state. It helps your website remember and track changes in data, contributing to a more responsive user experience. For example, useState is used to keep track of the number of items in your cart, the data of the product after a fetch call, and the data in forms."
        ]
    },
    {
        heading: 'useEffect',
        content: [
            "useEffect is another React Hook that performs side effects in functional components. It's useful for tasks like data fetching, setting up subscriptions, or manually changing the DOM in response to data changes. For this site, useEffect was primarily used to handle fetch calls."
        ]
    },
    {
        heading: 'useContext',
        content: [
            "useContext is a React Hook that simplifies the process of passing data throughout your component tree. It allows components to access shared information without manually passing props down the hierarchy. useContext was useful to manage data across different pages of the site: for example, the 'SingleProduct.JS' page can add an item to a cart, which needs to be updated in the cart icon in the navbar. Instead of passing this prop across different components, the cart products are managed in a 'CartContext.js' file."
        ]
    },
    {
        heading: 'Conditional Rendering',
        content: [
            "Conditional rendering involves showing or hiding components based on certain conditions. It allows your website to dynamically display content, making the user interface more adaptive and context-aware. Conditional rendering was useful to display messages such as 'Your cart is empty' if you had no items in your cart."
        ]
    }
];
