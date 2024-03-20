import styled from 'styled-components';
import classNames from 'classnames';

import { themeColors, resumeTheme } from 'themes/index';

const collapsedStyles = `
    flex: 0;
    height: 0;
    max-height: 0;
    opacity: 0;
    transition:
        color 300ms ease-out,
        height 150ms ease-out,
        max-height 150ms ease-out,
        opacity 300ms ease-out 100ms;
`;

const expandedStyles = `
    height: auto;
    max-height: 100%;
    opacity: 1;
    transition:
        color 300ms ease-in,
        height 150ms ease-in,
        max-height 150ms ease-in,
        opacity 300ms ease-in 100ms;
`;

const EmploymentItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding-right: 10vw;
    padding-left: 10vw;
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

        &.pluralsight {
            background-color: ${resumeTheme.psBackgroundHex};
            color: ${resumeTheme.psActionTextHex};
        }

        &.salesforce {
            background-color: ${resumeTheme.salesforceBeigeBgRgb};
            color: ${resumeTheme.salesforceDarkBlueRgb};
        }

        &.evergage {
            background-color: ${themeColors.whiteRgb};
            color: ${resumeTheme.evergageBlueHex};
        }

        &.upstatement {
            background-color: ${themeColors.blackRgb};
            color: ${themeColors.whiteRgb};
            font-family: 'TT Ramillas', 'GT America', Arial, Helvetica, Verdana, sans-serif;
        }

        &.boston-symphony-orchestra {
            background-color: ${resumeTheme.bsoBgHex};
            color: ${resumeTheme.bsoTextHex};
        }
    }
`;

const EmploymentItemGrid = styled.div`
    display: grid;
    grid-template-columns: 80% 20%;
    grid-template-rows: 3.25rem auto;

    .collapsed & .name-and-location-wrapper .togglable,
    .collapsed & .expandable-details.togglable,
    .collapsed & .expandable-details.togglable a {
        color: transparent;
        ${collapsedStyles}
    }

    .expanded & .name-and-location-wrapper .togglable,
    .expanded & .expandable-details.togglable,
    .expanded & .expandable-details.togglable a {
        ${expandedStyles}
    }
`;

const CompanyName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    /* transition: all 300ms ease-in; */
    z-index: 1;

    &:hover {
        cursor: pointer;
    }
`;

const ExpandableDetails = styled.div.attrs((props) => {
    return { className: classNames('expandable-details', props.className) };
})`
    display: flex;
    flex-direction: column;
    grid-row: 2;
    margin: 0;
    z-index: 0;

    .collapsed &,
    .collapsed & a {
        color: transparent;
        ${collapsedStyles}
    }

    .expanded & {
        flex: 1;
        /* height: auto;
        max-height: 100%;
        opacity: 1;
        transition: all 300ms ease-in; */
        ${expandedStyles}
    }

    .expanded.pluralsight & {
        color: ${resumeTheme.psActionTextHex};
    }

    .expanded.pluralsight & .role-item {
        /* color: ${resumeTheme.psSuccessTextWeakHex}; */
    }

    .expanded.salesforce & {
        color: ${resumeTheme.salesforceDarkBlueRgb};
    }

    .expanded.salesforce & .role-item {
        color: ${resumeTheme.salesforceMidBlueRgb};
    }

    .expanded.evergage & {
        color: ${resumeTheme.evergageGrayHex};
    }

    .expanded.evergage & .role-item {
        /* color: ''; */
    }

    .expanded.upstatement & {
        color: ${themeColors.whiteRgb};
    }

    .expanded.upstatement & .role-item {
        /* color: ''; */
    }

    .expanded.boston-symphony-orchestra & {
        color: ${resumeTheme.bsoTextHex};
    }

    .expanded.boston-symphony-orchestra & .role-item {
        /* color: ''; */
    }
`;

const ExpandableDetailsItemWrapper = styled.div`
    display: flex;
    width: fit-content;

    /* &.location-wrapper {
        margin-bottom: 0.5em;
    } */

    &.flex-column {
        flex-direction: column;
    }

    & a,
    & a:hover {
        text-decoration: underline;
    }

    .collapsed &,
    .collapsed & a {
        color: transparent;
        ${collapsedStyles}
    }

    .expanded & {
        /* flex: 1; */
        ${expandedStyles}

        &:not(.role, .responsibilities) {
            flex: 1;
        }

        &.responsibilities {
            /* flex: 1; */
            padding-top: 0.5rem;
        }
    }

    .expanded.pluralsight & li > a {
        color: ${resumeTheme.pluralsightPinkHex};
        text-shadow: 1px 1px 2px ${resumeTheme.psSurfaceHex};
    }

    .expanded.salesforce & li > a {
        color: ${resumeTheme.salesforceLightBlueHex};
    }

    .expanded.evergage & li > a {
        color: ${resumeTheme.evergageGrayHex};
    }

    .expanded.upstatement & li > a {
        color: ${themeColors.whiteRgb};
    }

    .expanded.boston-symphony-orchestra & li > a {
        color: ${resumeTheme.bsoTextHex};
    }
`;

const EmploymentIconWrapper = styled.span`
    display: flex;
    grid-row: 1 / span 2;
    justify-content: center;
    height: 100%;
    width: auto;

    & svg,
    & img {
        height: 100%;
        width: auto;
    }

    .collapsed & {
        ${collapsedStyles}
    }

    .expanded & {
        flex: 1;
        ${expandedStyles}
    }
`;

export {
    // <- to force formatting
    EmploymentItemGrid,
    EmploymentItemContainer,
    CompanyName,
    ExpandableDetails,
    ExpandableDetailsItemWrapper,
    EmploymentIconWrapper,
};
