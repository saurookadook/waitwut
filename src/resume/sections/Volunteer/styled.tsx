import styled from 'styled-components';

const VolunteerItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    row-gap: 0.5rem;
    z-index: 1;

    &.collapsed {
        flex: 0;
        max-height: min-content;
        /* padding: 0.5em 10vw; */
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

    .expanded & span.role-item {
        font-size: 1.5rem;
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
    VolunteerItemContainer, // <- to force formatting
    OrganizationName,
    VolunteerItemDetailWrapper,
};
