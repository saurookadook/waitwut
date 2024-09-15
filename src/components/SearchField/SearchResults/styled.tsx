import styled, { css } from 'styled-components';

import { allButFirstChild } from 'styles/selectors';

const StyledHitCount = styled.span`
    /* color: ${({ theme }) => theme.whiteFaded}; */
    color: rgb(255 255 255 / 0.8);
    display: flex;
    font-style: italic;
    justify-content: flex-end;
    padding: 0.5rem 1rem;
    padding-bottom: 0;
`;

const StyledPageHit = styled.div`
    & a {
        color: ${({ theme }) => theme.white};

        & h4 {
            font-size: 1rem;
            margin-top: 0;
            margin-bottom: 0.2rem;
        }
    }
`;

const popoverStyles = css`
    background: ${({ theme }) => theme.graphite};
    border: 1px solid ${({ theme }) => theme.graphite};
    border-radius: 2px;
    /* TODO: maybe this box shadow could be a better color? */
    box-shadow: 0 0 5px 0;
    flex-direction: column;
    margin-top: 0.5rem;
    max-height: 80vh;
    max-width: 30rem;
    overflow: scroll;
    position: absolute;
    right: 0;
    row-gap: 0.5rem;
    top: 100%;
    width: 25rem;
`;

interface StyledSearchResultsProps {
    readonly $show: boolean;
}

const StyledSearchResults = styled.div<StyledSearchResultsProps>`
    ${popoverStyles}

    display: ${({ $show }) => ($show ? 'flex' : 'none')};

    #waitwut & .Hits {
        padding: 0 1rem;

        & ol {
            list-style: none;
            margin-left: 0;
            padding-inline-start: 1rem;

            & li${allButFirstChild} {
                margin-top: 1rem;
            }
        }
    }

    & .ais-PoweredBy {
        background-color: ${({ theme }) => theme.commentGray};
        display: flex;
        font-size: 0.875rem;
        justify-content: flex-end;
        padding: 1rem;
        width: 100%;

        & svg {
            width: 7.5rem;
        }
    }
`;

export { StyledHitCount, StyledPageHit, StyledSearchResults };
