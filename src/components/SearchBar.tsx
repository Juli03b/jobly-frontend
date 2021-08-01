// search bar that runs function in parent component.
import { FC, useState } from 'react';

const SearchBar: FC<{onSearch: Function}> = ({onSearch}: {onSearch: Function}) => {
    const [query, setQuery] = useState<string>("");
    const inputChange = (e: any) => {
        const { value } = e.target;
        setQuery(value);
        onSearch(value)
    }
    const onSubmit = (e: any) => {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <form onSubmit={onSubmit} className="m-5 text-center">
            <div className="mx-auto">
                <input type="text" value={query} onChange={inputChange} placeholder="Enter query" className="form-control input-group w-50 d-inline"/>
                <button type="submit" className="btn btn-md btn-outline-dark mx-3">Search</button>
            </div>
        </form>
    );
}

export default SearchBar;