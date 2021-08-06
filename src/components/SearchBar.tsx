// search bar that runs function in parent component.
import { FC, useState } from 'react';
import SearchBarMui from 'material-ui-search-bar';
import { useEffect } from 'react';

const SearchBar: FC<{onSearch: Function, placeholder?: string}> = ({onSearch, placeholder = "Search"}) => {
    const [query, setQuery] = useState<string>();

    useEffect(() => onSearch(query), [query]);

    return (
        <SearchBarMui
            value={query}
            onChange={(query) => setQuery(query)}
            onRequestSearch={() => onSearch(query)}
            placeholder={placeholder}
        />
    );
}

export default SearchBar;