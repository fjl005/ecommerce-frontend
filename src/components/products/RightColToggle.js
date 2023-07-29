import { Button } from "reactstrap";

const RightColToggle = ({ section, toggleState, toggleStateFxn }) => {
    return (
        <div
            className='product-page-toggle-button'
            onClick={toggleStateFxn}
        >
            <h3>{section}</h3>
            {toggleState ? (
                <i class="fa-solid fa-angle-up"></i>
            ) : (
                <i class="fa-solid fa-angle-down"></i>
            )}
        </div>
    )
}

export default RightColToggle