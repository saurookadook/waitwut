import styled from 'styled-components';

import { collapsedStyles, expandedStyles } from 'resume/sections/styled';
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
    display: none;
    flex-direction: column;
    margin: 0;
    row-gap: 0.375rem;
    z-index: 0;

    &.clickable {
        display: flex;
    }

    .collapsed & {
        color: transparent;
        flex: 0;
        ${collapsedStyles}
    }

    .expanded & {
        color: initial;
        flex: 1;
        ${expandedStyles}
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
        z-index: 0;
    }

    .expanded &,
    .expanded & * {
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
            padding-top: 0.25rem;
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
