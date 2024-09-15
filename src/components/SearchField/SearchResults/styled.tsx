import styled, { css } from 'styled-components';

import { themeFromExample } from 'components/SearchField/index';
import SearchResults from './index';

const popoverStyles = css`
    background: ${({ theme }) => theme.backgroundColor};
    border-radius: 2px;
    box-shadow: 0 0 5px 0;
    margin-top: 0.5rem;
    max-height: 80vh;
    max-width: 30rem;
    overflow: scroll;
    padding: 1rem;
    position: absolute;
    right: 0;
    top: 100%;
`;

interface StyledSearchResultsProps {
    readonly $show: boolean;
}

const StyledSearchResults = styled(SearchResults)<StyledSearchResultsProps>`
    display: ${({ $show }) => ($show ? 'block' : 'none')};
    ${popoverStyles}

    & .HitCount {
        display: flex;
        justify-content: flex-end;
    }

    & .Hits {
        & ol {
            list-style: none;
            margin-left: 0;
        }

        & li.ais-Hits-item {
            margin-bottom: 1rem;

            & a {
                color: ${() => themeFromExample.foreground};

                & h4 {
                    margin-top: 0;
                    margin-bottom: 0.2rem;
                }
            }
        }
    }

    & .ais-PoweredBy {
        display: flex;
        font-size: 80%; /* percent...? */
        justify-content: flex-end;

        & svg {
            width: 7.5rem;
        }
    }
`;

export { StyledSearchResults };
