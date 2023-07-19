import LoginForm from '../components/LoginForm';

const LoginPage = ({ username, setUsername }) => {
    return (
        <>
            <LoginForm username={username} setUsername={setUsername} />
        </>
    )
}

export default LoginPage;