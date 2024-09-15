import React from 'react';
import { useSearchBox } from 'react-instantsearch';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Autocomplete, TextField } from '@mui/material';

const SearchBox = ({
    className,
    hasFocus,
    onFocus,
    onChange,
}: {
    className?: string;
    hasFocus: boolean;
    onFocus: React.FocusEventHandler;
    onChange: React.ChangeEventHandler;
}) => {
    const { query, refine } = useSearchBox();

    return (
        <form className={className}>
            <Autocomplete
                id="search-input"
                freeSolo
                options={[]}
                renderInput={(params) => <TextField {...params} label="freeSolo" />}
            />
        </form>
    );
};

export default SearchBox;
