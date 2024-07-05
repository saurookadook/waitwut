import styled from 'styled-components';
import classNames from 'classnames';

import { GenericItemContainer } from 'resume/styled';
import { collapsedStyles, expandedStyles } from 'resume/sections/styled';
import { minWidth600 } from 'styles/mq';
import { allButLastChild } from 'styles/selectors';
import { themeColors, resumeTheme } from 'themes/index';

const EmploymentItemContainer = styled(GenericItemContainer)`
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 0.5rem 5vw;
    position: relative;
    z-index: 1;

    ${minWidth600} {
        padding: 0.5rem 10vw;
    }

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
    grid-template-rows: 1fr auto;
    height: min-content;

    & .name-and-location-wrapper {
        align-items: center;
        cursor: pointer;
    }

    ${minWidth600} {
        grid-template-rows: 3.25rem auto;

        /* & .name-and-location-wrapper {
            max-height: 3.25rem;
        } */
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
    cursor: pointer;
    margin-top: 0;
    margin-bottom: 0;
    /* transition: all 300ms ease-in; */
    z-index: 1;
`;

const ExpandableDetails = styled.div.attrs((props) => {
    return { className: classNames('expandable-details', props.className) };
})`
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    grid-column: 1 / span 2;
    grid-row: 2;
    justify-content: center;
    margin: 0;
    padding-top: 0.5rem;
    padding-right: 0;
    padding-left: 0.5rem;
    z-index: 1;

    ${minWidth600} {
        grid-column: 1 / span 1;
        padding-right: 10rem;
        padding-top: 0;
    }

    & .role-item {
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;

        &${allButLastChild} {
            margin-bottom: 0.5rem;
        }

        ${minWidth600} {
            flex-direction: row;
            margin-bottom: 0;
        }
    }

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
            padding: 0.5rem 0;
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
    /* grid-row: 1 / span 1; */
    height: 6.5rem;
    /* justify-content: center; */
    overflow-y: hidden;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    width: auto;

    & svg,
    & img {
        flex-grow: 1;
        height: 100%;
        margin: auto;
        width: auto;
    }

    ${minWidth600} {
        display: flex;
        grid-row: 1 / span 2;
        justify-content: center;
        overflow-y: hidden;
        position: relative;
        width: 100%;
    }

    .collapsed & {
        ${collapsedStyles}
        min-height: 0;
    }

    .expanded & {
        ${expandedStyles}
        flex: 1;
        opacity: 0.5;

        ${minWidth600} {
            align-self: flex-start;
            height: auto;
            min-height: 15rem;
            opacity: 1;
        }
    }

    &.upstatement {
        overflow-y: visible;
    }

    &.boston-symphony-orchestra {
        /* TODO: this still looks shitty but for now, it's good enough for jazz */
        right: -1.5rem;
    }
`;

export {
    // force formatting
    EmploymentItemGrid,
    EmploymentItemContainer,
    CompanyName,
    ExpandableDetails,
    ExpandableDetailsItemWrapper,
    EmploymentIconWrapper,
};
