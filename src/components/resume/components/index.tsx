import styled from 'styled-components';

import { toKebabCase } from '../../../utils';
import { resumeTheme, themeColors } from '../../../themes';

const PADDING_PROPERTIES = [
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
];

const hasPaddingProperties = (overrides: StyleOverrides): boolean => {
    return Object.keys(overrides).some((key) => PADDING_PROPERTIES.includes(key));
};

function addPadding(overrides: StyleOverrides, defaultPadding: string): string {
    if (!(overrides && hasPaddingProperties(overrides))) {
        return `padding: ${defaultPadding};`;
    }

    return Object.keys(overrides).reduce((acc, curKey) => {
        const curValue = (overrides || {})[curKey];
        if (PADDING_PROPERTIES.includes(curKey) && curValue) {
            acc += `${toKebabCase(curKey)}: ${curValue};`;
        }
        return acc;
    }, '');
}

const GenericContainer = styled.div<GenericStyledProps>`
    ${(props) => addPadding(props.overrides || {}, '0 10vw 0.5em')}

    background-color: ${(props) => props.overrides?.backgroundColor || themeColors.white};
    color: ${(props) => props.overrides?.color || themeColors.blackHex};
`;

const GenericHeading = styled.h2<GenericStyledProps>`
    ${(props) => addPadding(props.overrides || {}, '0 0 0.5em')}

    background-color: ${(props) => props.overrides?.backgroundColor || 'inherit'};
    color: ${(props) => props.overrides?.color || 'inherit'};
    font-size: 3.5rem;
`;

const GenericGridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const LocationText = styled.i`
    margin-bottom: 0.2em;

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

const NameAndLocationWrapper = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: row;

    & i {
        margin-left: 1em;
    }
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

export {
    // <- to force formatting
    GenericContainer,
    GenericHeading,
    GenericGridContainer,
    LocationText,
    NameAndLocationWrapper,
    ToggleIcon,
};
