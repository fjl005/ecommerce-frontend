import LoginForm from '../components/LoginForm';
import NavbarApp from '../components/NavbarApp';

const LoginPage = ({ username, setUsername, loggedIn, setLoggedIn, setAdmin, pageLoading }) => {
    return (
        <>
            <NavbarApp />
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