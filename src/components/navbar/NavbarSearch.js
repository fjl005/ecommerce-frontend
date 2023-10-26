import { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Search query:', searchQuery);
    };

    return (
        <div className='d-flex'>
            <Form onSubmit={handleSearchSubmit} className='navbar-search-form'>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
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

export default SearchBar;
