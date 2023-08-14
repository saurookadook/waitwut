import styled from 'styled-components';
import { themeColors } from '../../../../themes';

const ProjectItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    margin: 0.5rem 0;
    z-index: 1;

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

const ProjectDisplayName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;

    &:hover {
        cursor: pointer;
    }
`;

const ProjectDetails = styled.div`
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

const ProjectLink = styled.a`
    color: ${themeColors.darkerPurpleHex};
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin-bottom: 0.25rem;

    &:hover {
        text-decoration: underline;
    }
`;

const SubText = styled.p`
    font-size: 1rem;
    line-height: 1.5rem;
`;

export {
    ProjectItemContainer, // <- to force formatting
    ProjectDisplayName,
    ProjectDetails,
    ProjectLink,
    SubText,
};
