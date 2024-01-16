import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const RightColToggle = ({ section, toggleState, toggleStateFxn }) => {
    return (
        <div
            className='product-page-toggle-button'
            onClick={() => toggleStateFxn(!toggleState)}
        >
            <h3>{section}</h3>
            {toggleState ? (
                <FontAwesomeIcon icon={faAngleUp} />
            ) : (
                <FontAwesomeIcon icon={faAngleDown} />
            )}
        </div>
    )
}

export default RightColToggle