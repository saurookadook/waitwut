import styled from 'styled-components';

import { themeColors } from 'themes/index';

const ProjectItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0.5rem 0;
    z-index: 5;

    &.collapsed {
        flex: 0;
        max-height: min-content;
        transition: all 300ms ease-out;
    }

    &.expanded {
        flex: 1;
        max-height: 100%;
        transition: all 300ms ease-in;
    }
`;

const ProjectNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 10;
`;

const ProjectDisplayName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    position: relative;
    z-index: 10;

    &:hover {
        cursor: pointer;
    }
`;

const ProjectDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    row-gap: 0.25rem;
    z-index: 0;

    .collapsed & {
        color: transparent;
        flex: 0;
        height: 0;
        max-height: 0;
        opacity: 0;
        transition: all 300ms ease-out;
    }

    .expanded & {
        color: initial;
        flex: 1;
        height: auto;
        max-height: 100%;
        opacity: 1;
        transition: all 300ms ease-in;
    }
`;

const ProjectLink = styled.a`
    color: ${themeColors.darkerPurpleHex};
    font-size: 1.5rem;
    line-height: 2rem;
    /* margin-bottom: 0.25rem; */
    width: fit-content;

    &:hover {
        text-decoration: underline;
    }

    & > svg {
        height: 1.5rem;
        vertical-align: middle;
        width: auto;
    }

    .collapsed &,
    .collapsed & * {
        max-height: 0;
        z-index: 0;
    }

    .expanded &,
    .expanded & * {
        max-height: auto;
        z-index: 11;
    }
`;

const ProjectLinkText = styled.span`
    display: inline-block;
    margin-left: 0.5rem;
    position: relative;

    .collapsed & {
        height: 0;
    }

    .expanded & {
        height: auto;
    }
`;

const SubText = styled.p`
    #resume & {
        font-size: 1.25rem;
        line-height: 1.5rem;
        width: fit-content;

        &.project-dates {
            display: block;
            /* font-size: 0.78125rem; */
            /* font-size: 0.875rem; */
            font-size: 1rem;
            height: 100%;
            line-height: 1.25rem;
            padding-bottom: 0.25rem;
        }

        & i {
            display: block;
            /* font-size: 0.78125rem; */
            /* font-size: 0.875rem; */
            font-size: 1rem;
            height: 100%;
            line-height: 1.25rem;
        }
    }
`;

export {
    ProjectItemContainer, // <- to force formatting
    ProjectNameWrapper,
    ProjectDisplayName,
    ProjectDetails,
    ProjectLink,
    ProjectLinkText,
    SubText,
};
