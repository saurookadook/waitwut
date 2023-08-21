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
    font-size: 2.75rem;
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

        .pluralsight & {
            color: ${resumeTheme.psActionTextHex};
        }

        .salesforce & {
            color: ${resumeTheme.salesforceLightBlueHex};
        }

        .evergage & {
            color: ${resumeTheme.evergageGrayHex};
        }

        .upstatement & {
            color: ${themeColors.whiteRgb};
        }

        .boston-symphony-orchestra & {
            color: ${resumeTheme.bsoTextHex};
        }
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
`;

export {
    EmploymentItemContainer, // <- to force formatting
    CompanyName,
    ExpandableDetails,
    ExpandableDetailsItemWrapper,
};
