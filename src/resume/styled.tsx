import styled from 'styled-components';
import classNames from 'classnames';

import { addPadding } from 'resume/utils';
import { minWidth600 } from 'styles/mq';
import { allButLastChild } from 'styles/selectors';
import { resumeTheme, themeColors } from 'themes/index';

const GenericContainer = styled.div.attrs((props) => {
    return {
        className: classNames('generic-container', props.className),
    };
})<GenericStyledProps>`
    ${(props) => addPadding(props.overrides || {}, '0 0 0.5rem')}

    background-color: ${(props) => props.overrides?.backgroundColor || themeColors.white};
    color: ${(props) => props.overrides?.color || themeColors.blackHex};
    position: relative;
    z-index: 10;

    #resume & ul,
    #resume & li {
        list-style: '\\21A0\\0020\\0020';
    }

    #resume & li {
        &${allButLastChild} {
            margin-bottom: 0.25rem;
        }

        &::marker {
            margin-right: 1rem;
        }
    }
`;

const GenericHeading = styled.h2.attrs({
    className: 'generic-heading',
})<GenericStyledProps>`
    ${(props) => addPadding(props.overrides || {}, '0 0 0.5rem')}

    background-color: ${(props) => props.overrides?.backgroundColor || 'inherit'};
    color: ${(props) => props.overrides?.color || 'inherit'};
    font-size: 3.5rem;
`;

const GenericGridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    position: relative;
    z-index: 10;

    ${minWidth600} {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const GenericItemContainer = styled.div.attrs((props) => {
    return { className: classNames('generic-item-container', props.className) };
})`
    padding: 0.5rem 5vw;

    ${minWidth600} {
        padding: 0.5rem 10vw;
    }
`;

const LocationText = styled.i`
    align-self: flex-end;
    margin-bottom: 0.0625rem;
    margin-left: 0.5rem;

    ${minWidth600} {
        font-size: 1.25rem;
        /* margin-bottom: 0.625rem; */
        margin-bottom: 0.2rem;
    }

    .collapsed & {
        color: transparent;
        opacity: 0;
        transition: all 300ms ease-out;
    }

    .expanded & {
        color: initial;
        opacity: 1;
        transition: all 300ms ease-in;
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

const NameAndLocationWrapper = styled.div.attrs((props) => {
    return { className: classNames('name-and-location-wrapper', props.className) };
})`
    align-items: flex-end;
    display: flex;
    flex-direction: row;
    grid-row: 1;
`;

const NameAndLocationTextWrapper = styled.span`
    align-items: baseline;
    display: inline-flex;
`;

const ToggleIcon = styled.span`
    align-self: center;
    display: flex;
    font-size: 1.125rem;
    height: 24px;
    line-height: 1;
    width: 24px;
    z-index: 100;

    &:hover {
        cursor: pointer;
    }
`;

const listItemPadding = '40px';

export {
    GenericContainer, // force formatting
    GenericHeading,
    GenericGridContainer,
    GenericItemContainer,
    LocationText,
    NameAndLocationWrapper,
    NameAndLocationTextWrapper,
    ToggleIcon,
    listItemPadding,
};
