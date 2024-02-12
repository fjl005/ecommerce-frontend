import { NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useCartContext } from "../../contexts/CartContext";
import { useLoginContext } from "../../contexts/LoginContext";
import { useSavedItemContext } from '../../contexts/SavedItemContext';
import { NAV_TITLE } from "./navbarPageTitles";
import { Link } from "react-router-dom";

const ProfileButtonToggle = () => {
    const { setCartLength } = useCartContext();
    const { setSavedLength } = useSavedItemContext();
    const { loggedIn, triggerLogout } = useLoginContext();

    return (
        <NavItem>
            {loggedIn && (
                <UncontrolledDropdown className='ml-3'>

                    <DropdownToggle color='primary' className='btn-border-none' caret>
                        Profile
                    </DropdownToggle>

                    <DropdownMenu>
                        {NAV_TITLE.profileBtn.map((navText, idx) => (
                            <DropdownItem
                                key={idx}
                                tag={Link}
                                to={navText.link}
                                onClick={navText.logoutTrigger ? () => {
                                    triggerLogout();
                                    setCartLength(0);
                                    setSavedLength(0);
                                } : null}
                            >
                                {navText.title}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </UncontrolledDropdown>
            )}
        </NavItem>
    )
}

export default ProfileButtonToggle;