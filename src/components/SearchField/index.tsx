import React, { createRef, useState, useMemo } from 'react';
import { Algoliasearch, algoliasearch } from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch';
import { ThemeProvider } from 'styled-components';

import { StyledSearchBox } from 'components/SearchField/SearchBox/styled';
import SearchResults from 'components/SearchField/SearchResults';
import { themeColors } from 'themes';
import { useClickOutside } from 'utils';
import { StyledSearchFieldRoot } from './styled';

const defaultIndices: SearchIndex[] = [{ name: 'Pages', title: 'Pages' }];

const searchFieldTheme = {
    commentGray: themeColors.commentGray,
    graphite: themeColors.graphite,
    white: themeColors.white,
    whiteFaded: 'rgb(255 255 255 / 0.6)',
};

const SearchField = ({ indices = defaultIndices }) => {
    const rootRef = createRef<HTMLDivElement>();
    const [query, setQuery] = useState<string>();
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const searchClient = useMemo<Algoliasearch>(
        () =>
            algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
        [],
    );

    useClickOutside(rootRef, () => setHasFocus(false));

    return (
        <ThemeProvider theme={searchFieldTheme}>
            <StyledSearchFieldRoot ref={rootRef}>
                <InstantSearch
                    // @ts-expect-error: the base type of `Algoliasearch` type is `SearchClient` so not sure what's up there lol
                    searchClient={searchClient}
                    indexName={indices[0].name}
                >
                    <StyledSearchBox
                        $hasFocus={hasFocus}
                        onChangeCb={(queryValue: string) => setQuery(queryValue)}
                        onFocusCb={() => setHasFocus(true)}
                    />
                    <SearchResults
                        indices={indices} // force formatting
                        show={hasFocus && !!query && query.length > 0}
                    />
                </InstantSearch>
            </StyledSearchFieldRoot>
        </ThemeProvider>
    );
};

export default SearchField;
