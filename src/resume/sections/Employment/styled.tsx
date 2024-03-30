import styled from 'styled-components';
import classNames from 'classnames';

import { collapsedStyles, expandedStyles } from 'resume/sections/styled';
import { minWidth600 } from 'styles/mq';
import { themeColors, resumeTheme } from 'themes/index';

const EmploymentItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0.5rem 10vw;
    position: relative;
    z-index: 1;

    &.collapsed {
        color: ${themeColors.white};
        /* max-height: 4.25rem; */
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        transition: all 250ms ease-in 400ms;
    }

    &.expanded {
        /* max-height: 40rem; */
        padding-top: 1rem;
        padding-bottom: 1rem;
        transition: all 500ms ease-in;

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
    /* grid-template-rows: 1fr auto; */

    ${minWidth600} {
        & .name-and-location-wrapper {
            max-height: 3.25rem;
        }
    }

    .collapsed & {
        transition: all 200ms ease-out;
    }

    .expanded & {
        transition: all 200ms ease-out;
    }

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
    justify-content: center;
    margin: 0;
    padding-right: 10rem;
    z-index: 0;

    .collapsed &,
    .collapsed & a {
        color: transparent;
        ${collapsedStyles}
    }

    .expanded & {
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
        ${expandedStyles}

        &:not(.role, .responsibilities) {
            flex: 1;
        }

        &.responsibilities {
            padding-top: 0.5rem;
        }
    }

    .expanded.pluralsight & li > a {
        color: ${resumeTheme.pluralsightPinkHex};
        /* text-shadow: 1px 1px 2px ${resumeTheme.psSurfaceHex}; */
    }

    .expanded.salesforce & li > a {
        color: ${resumeTheme.salesforceLightBlueHex};
    }

    .expanded.evergage & li > a {
        color: ${resumeTheme.evergageGrayHex};
    }

    .expanded.upstatement & li > a {
        box-shadow: 0 -1px ${resumeTheme.upstatementLinkUnderline} inset;
        color: ${themeColors.white};

        &:hover {
            box-shadow: 0 -1px ${themeColors.white} inset;
        }
    }

    .expanded.boston-symphony-orchestra & li > a {
        color: ${resumeTheme.bsoTextHex};
    }
`;

const EmploymentIconWrapper = styled.span`
    display: flex;
    grid-row: 1 / span 2;
    height: auto;
    justify-content: center;
    overflow-y: hidden;
    width: 100%;

    & svg,
    & img {
        height: 100%;
        margin: auto;
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
