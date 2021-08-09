// search bar that runs function in parent component.
import { FC, useState } from 'react';
import SearchBarMui from 'material-ui-search-bar';
import { useEffect } from 'react';

/** Component to show search bar
 * 
 * Props:
 * 
 * onSearch: function to call, pass input text
 * 
 * placeholder: optional prop to show different 
 * placeholder text
 * 
 */
const SearchBar: FC<{onSearch: Function, placeholder?: string}> = ({onSearch, placeholder = "Search"}) => {
    const [query, setQuery] = useState<string>();

    useEffect(() => onSearch(query), [query]);

    return (
        <SearchBarMui
            value={query}
            onChange={setQuery}
            onRequestSearch={() => onSearch(query)}
            placeholder={placeholder}
        />
    );
}

export default SearchBar;