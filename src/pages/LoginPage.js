import LoginForm from '../components/LoginForm';
import NavbarApp from '../components/NavbarApp';

const LoginPage = ({ username, setUsername }) => {
    return (
        <>
            <NavbarApp />
            <LoginForm username={username} setUsername={setUsername} />
        </>
    )
}

export default LoginPage;