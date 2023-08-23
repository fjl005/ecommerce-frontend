import LoginForm from '../components/login/LoginForm';
import NavbarApp from '../components/miscellaneous/NavbarApp';
import { useCartContext } from "../components/cart/CartContext";


const LoginPage = ({ username, setUsername, loggedIn, setLoggedIn, setAdmin, pageLoading }) => {
    const { cartLength } = useCartContext();
    return (
        <>
            <NavbarApp cartLength={cartLength} />
            <LoginForm
                username={username}
                setUsername={setUsername}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                setAdmin={setAdmin}
                pageLoading={pageLoading}
            />
        </>
    )
}

export default LoginPage;