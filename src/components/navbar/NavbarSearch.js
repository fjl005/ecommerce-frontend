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
        <div className='d-flex'
            style={{
                width: '100%', // Make the input stretch to fill available width
                padding: '8px', // Adjust padding as needed
                borderRadius: '4px', // Apply border radius
            }}>
            <Form onSubmit={handleSearchSubmit} className='d-flex'>
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        marginRight: '8px', // Add some space between input and button
                    }}
                />
                <Button type="submit">Search</Button>
            </Form>
        </div>
    );
};

export default SearchBar;
