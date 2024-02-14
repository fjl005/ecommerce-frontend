import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const RightColToggle = ({ stateKey, state, setState, title }) => {
    return (
        <div
            className='product-page-toggle-button'
            onClick={() => setState(prevState => ({
                ...prevState,
                [stateKey]: !prevState[stateKey]
            }))}
        >
            <h3 className='mb-0'>{title}</h3>
            {state[stateKey] ? (
                <FontAwesomeIcon icon={faAngleUp} />
            ) : (
                <FontAwesomeIcon icon={faAngleDown} />
            )}
        </div>
    )
}

export default RightColToggle