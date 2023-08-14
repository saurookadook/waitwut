import styled from 'styled-components';

const VolunteerItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
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
    z-index: 0;

    &.hidden,
    &.hidden * {
        color: transparent;
        flex: 0;
        height: 0;
        max-height: 0;
        opacity: 0;
    }

    &.visible,
    &.visible * {
        flex: 1;
        height: auto;
        max-height: 100%;
        opacity: 1;
    }
`;

export {
    VolunteerItemContainer, // <- to force formatting
    OrganizationName,
    VolunteerItemDetailWrapper,
};
