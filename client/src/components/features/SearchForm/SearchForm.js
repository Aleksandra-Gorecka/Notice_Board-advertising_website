import { Button, InputGroup, Form } from 'react-bootstrap';
import { useState } from "react";

const SearchForm = () =>{

    const [searchPhrase, setSearchPhrase] = useState('');

    const handleSearch = () => {
        window.location.href = `/search/${searchPhrase}`;
    }; 

    return (
        <div className="d-flex justify-content-center mt-3 mb-5 ">
			<div>
				<InputGroup className="">
					<Form.Control
						className="shadow-none"
						type="text"
						placeholder="search phrase..."
						value={searchPhrase}
						onChange={e => setSearchPhrase(e.target.value)}
					/>
					<Button variant="success" onClick={handleSearch}>
						Search
					</Button>
				</InputGroup>
			</div>
		</div>
    )
}

export default SearchForm;