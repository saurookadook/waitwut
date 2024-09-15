import styled, { css } from 'styled-components';

import SearchBox from './index';

const openStyles = css`
    background: ${({ theme }) => theme.graphite};
    cursor: text;
    margin-left: -1.5rem;
    padding-left: 1.5rem;
    width: 15rem;
`;

const closedStyles = css`
    background: transparent;
    cursor: pointer;
    margin-left: -1rem;
    padding-left: 1rem;
    width: 0;
`;

interface StyledSearchBoxProps {
    readonly $hasFocus: boolean;
}

const StyledSearchBox = styled(SearchBox)<StyledSearchBoxProps>`
    align-items: center;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 0;

    & .search-input {
        ${({ $hasFocus }) => ($hasFocus ? openStyles : closedStyles)}

        border: ${({ $hasFocus }) => ($hasFocus ? 'auto' : 'none')};
        border-radius: 2px;
        color: ${({ theme }) => theme.white};
        font-size: 1rem;
        /* outline: none; */
        transition: 100ms;

        &::placeholder {
            color: ${({ theme }) => theme.white};
        }
    }

    & .search-input-icon {
        color: ${({ theme }) => theme.white};
        margin: 0.25rem;
        pointer-events: none;
        width: 1rem;
        z-index: 1;
    }
`;

export { StyledSearchBox };
