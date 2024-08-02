import { Link } from 'gatsby';
import styled from 'styled-components';

import { minWidth600 } from 'styles/mq';

const LinkGroupWrapper = styled.li`
    list-style: none;
`;

const StyledNavLink = styled(Link)`
    align-items: center;
    color: ${(props) => props?.theme?.color};
    display: flex;
    flex-direction: row;
    font-size: 1.25rem;
    margin-left: 0;
    padding: 0.25rem 0.375rem;
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

const ChildLinkGroupWrapper = styled.ul`
    display: flex;
    flex-direction: column;
`;

const ChildLinkGroupDetails = styled.details``;

const ChildLinkGroupSummary = styled.summary`
    list-style-position: outside;
`;

export {
    StyledNavLink, // force formatting
    LinkGroupWrapper,
    ChildLinkGroupWrapper,
    ChildLinkGroupDetails,
    ChildLinkGroupSummary,
};
