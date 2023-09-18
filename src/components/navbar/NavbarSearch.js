import { useState } from 'react';
import { Form, Input, Button } from 'reactstrap';

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
            <Form onSubmit={handleSearchSubmit} className='d-flex' style={{ width: '100%', padding: '0px' }}>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        marginRight: '8px',
                    }}
                />
                <Button type="submit" style={{ borderRadius: '50%' }}>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </Button>
            </Form>
        </div>
    );
};

export default SearchBar;