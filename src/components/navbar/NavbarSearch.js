import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useProductContext } from '../products/ProductContext';

const NavbarSearch = () => {

    const [presubmitSearch, setPresubmitSearch] = useState('');
    const { searchQuery, setSearchQuery } = useProductContext();
    const navigate = useNavigate();

    const handlePresubmitChange = (event) => {
        setPresubmitSearch(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchQuery(presubmitSearch);
    };

    useEffect(() => {
        if (searchQuery) {
            navigate(`/search/${searchQuery}`);
        }
    }, [searchQuery]);


    return (
        <div className='d-flex'>
            <Form onSubmit={handleSearchSubmit} className='navbar-search-form'>
                <Input
                    type="text"
                    placeholder="Search Product..."
                    value={presubmitSearch}
                    onChange={handlePresubmitChange}
                    style={{
                        marginRight: '8px',
                    }}
                />
                <Button type="submit" className='navbar-search-button'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
            </Form>
        </div>
    );
};

export default NavbarSearch;
