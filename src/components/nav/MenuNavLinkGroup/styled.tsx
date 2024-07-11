import { Link } from 'gatsby';
import styled from 'styled-components';

import { minWidth600 } from 'styles/mq';

const StyledNavLink = styled(Link)`
    align-items: center;
    color: ${(props) => props?.theme?.color};
    display: flex;
    flex-direction: row;
    font-size: 1.25rem;
    padding: 0.25em 0 0.25em 1em;
    text-align: left;
    text-decoration: none;

    & > svg {
        height: 1.75em;
        margin-right: 0.25em;
        width: 1.75em;
    }

    & > span {
        display: block;
        overflow: hidden;
        max-width: 200px;
        white-space: break-spaces;

        ${minWidth600} {
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`;

const ChildLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export { StyledNavLink, ChildLinkWrapper };
