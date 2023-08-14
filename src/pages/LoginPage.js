import LoginForm from '../components/login/LoginForm';
import NavbarApp from '../components/miscellaneous/NavbarApp';

const LoginPage = ({ username, setUsername, loggedIn, setLoggedIn, setAdmin, pageLoading, cartLength }) => {
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