import styled from 'styled-components';
import { themeColors, resumeTheme } from '../../../../themes';

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
        }

        &.salesforce {
            background-color: ${resumeTheme.salesforceBeigeBgRgb};
        }

        &.evergage {
            background-color: ${themeColors.whiteRgb};
        }

        &.upstatement {
            background-color: ${themeColors.blackRgb};
        }

        &.boston-symphony-orchestra {
            background-color: ${resumeTheme.bsoBgHex};
        }
    }
`;

const CompanyName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    transition: all 300ms ease-in;
    z-index: 1;

    &:hover {
        cursor: pointer;
    }

    .expanded.pluralsight & {
        color: ${resumeTheme.psActionTextHex};
    }

    .expanded.salesforce & {
        color: ${resumeTheme.salesforceDarkBlueRgb};
    }

    .expanded.evergage & {
        color: ${resumeTheme.evergageBlueHex};
    }

    .expanded.upstatement & {
        color: ${themeColors.whiteRgb};
        font-family: 'TT Ramillas', 'GT America', Arial, Helvetica, Verdana, sans-serif;
    }

    .expanded.boston-symphony-orchestra & {
        color: ${resumeTheme.bsoTextHex};
    }
`;

const ExpandableDetails = styled.div`
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
