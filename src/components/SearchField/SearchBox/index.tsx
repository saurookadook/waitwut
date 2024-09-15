import React from 'react';
import { useSearchBox } from 'react-instantsearch';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Autocomplete, TextField } from '@mui/material';

const SearchBox = ({
    className,
    onChangeCb,
    onFocusCb,
}: {
    className?: string;
    onChangeCb: (query: string) => void;
    onFocusCb: React.FocusEventHandler;
}) => {
    const { query, refine } = useSearchBox();

    return (
        <form className={className}>
            {/* <Autocomplete
                id="search-input"
                freeSolo
                options={[]}
                renderInput={(params) => <TextField {...params} label="freeSolo" />}
            /> */}
            <input
                className="search-input"
                aria-label="Search field"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    refine(e.target.value);
                    onChangeCb(e.target.value);
                }}
                onFocus={onFocusCb}
                placeholder="Search"
                type="text"
                value={query}
            />
            <SearchSharpIcon className="search-input-icon" />
        </form>
    );
};

export default SearchBox;
