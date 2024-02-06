import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useProductSearchContext } from '../../contexts/ProductSearchContext';

const NavbarSearch = () => {

    const [presubmitSearch, setPresubmitSearch] = useState('');
    const { setSearchQuery } = useProductSearchContext();
    const navigate = useNavigate();

    const handlePresubmitChange = (event) => {
        setPresubmitSearch(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(presubmitSearch);
        if (presubmitSearch) {
            navigate(`/search/${presubmitSearch}`);
        } else {
            navigate(`/`);
        }
    };

    return (
        <div className='d-flex'>
            <Form onSubmit={handleSearchSubmit} className='navbar-search-form'>
                <Input
                    type="text"
                    placeholder="Search Product..."
                    value={presubmitSearch}
                    onChange={handlePresubmitChange}
                    style={{ marginRight: '0.5rem' }}
                />
                <Button type="submit" className='navbar-search-button'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
            </Form>
        </div>
    );
};

export default NavbarSearch;
