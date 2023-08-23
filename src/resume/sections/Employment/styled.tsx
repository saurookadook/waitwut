import styled from 'styled-components';
import { themeColors, resumeTheme } from 'themes/index';

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

const CompanyName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    /* transition: all 300ms ease-in; */
    z-index: 1;

    &:hover {
        cursor: pointer;
    }
`;

const ExpandableDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    z-index: 0;

    .collapsed &,
    .collapsed & a {
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

    &.location-wrapper {
        margin-bottom: 0.5em;
    }

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

    .expanded.pluralsight & li > a {
        color: ${resumeTheme.psActionTextHex};
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

export {
    EmploymentItemContainer, // <- to force formatting
    CompanyName,
    ExpandableDetails,
    ExpandableDetailsItemWrapper,
};
