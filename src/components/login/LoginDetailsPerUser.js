import { Button } from "reactstrap";
import { useLoginContext } from "../../contexts/LoginContext";

const LoginDetailsPerUser = ({ details, loginPage }) => {
    const { setUsername, setPassword } = useLoginContext();

    return (
        <div style={{ marginBottom: '3rem' }}>
            <div className='d-flex align-items-center'>
                <h3 className='h3-about-page-top mb-0'>{details.h3Heading}</h3>
                {loginPage && details.autofill.exists && (
                    <Button
                        className='ml-3 border-0'
                        onClick={() => {
                            setUsername(details.autofill.username);
                            setPassword(details.autofill.password);
                        }}
                    >
                        {details.autofill.buttonText}
                    </Button>
                )}
            </div>
            <h5>{details.h5Heading}</h5>
            {details.list.exists && (
                <ul>
                    {details.list.bulletpoints.map((bulletpoint, index) => (
                        <li key={index}>{bulletpoint}</li>
                    ))}
                </ul>
            )}
            <p>{details.pText}</p>
        </div>
    )
}

export default LoginDetailsPerUser