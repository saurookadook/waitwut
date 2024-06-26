import styled from 'styled-components';

import { GenericItemContainer } from 'resume/styled';
import { minWidth600 } from 'styles/mq';

const VolunteerItemContainer = styled(GenericItemContainer)`
    display: flex;
    flex-direction: column;
    height: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
    row-gap: 0.5rem;
    z-index: 1;

    &.collapsed {
        flex: 0;
        max-height: min-content;
        padding-top: 0.5em;
        padding-bottom: 0.5em;
        transition: all 300ms ease-out;
    }

    &.expanded {
        flex: 1;
        max-height: 100%;
        /* padding: 1em 10vw; */
        padding-top: 1em;
        padding-bottom: 1em;
        transition: all 300ms ease-in;
    }
`;

const OrganizationName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    transition: all 300ms ease-in;
    z-index: 1;

    &:hover {
        cursor: pointer;
    }
`;

const VolunteerItemDetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    row-gap: 0.25rem;
    z-index: 0;

    .expanded & .role-item {
        font-size: 1.2rem;

        ${minWidth600} {
            font-size: 1.5rem;
        }
    }

    & .role-item {
        display: flex;
        flex-direction: column;

        ${minWidth600} {
            flex-direction: row;
        }
    }

    .collapsed & {
        color: transparent;
        flex: 0;
        height: 0;
        max-height: 0;
        opacity: 0;
        transition: all 300ms ease-out;
    }

    .expanded & {
        flex: 1;
        height: auto;
        max-height: 100%;
        opacity: 1;
        transition: all 300ms ease-in;
    }
`;

export {
    VolunteerItemContainer, // force formatting
    OrganizationName,
    VolunteerItemDetailWrapper,
};
