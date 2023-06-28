import styled from 'styled-components';
import { themeColors } from '../../../themes';

const PADDING_PROPERTIES = [
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
];

const hasPaddingProperties = (overrides: Record<string, string | number>): boolean => {
    return Object.keys(overrides).some((key) => PADDING_PROPERTIES.includes(key));
};

export const GenericContainer = styled.div<GenericStyledProps>`
    color: ${(props) => props.overrides?.textColor || themeColors.blackHex};
    background-color: ${(props) => props.overrides?.bgColor || themeColors.white};
    /* TODO: this should probably get moved into a function :) */
    ${(props) => {
        if (!(props.overrides && hasPaddingProperties(props.overrides))) {
            return 'padding: 0 0 0.5em';
        }

        return Object.keys(props.overrides).reduce((acc, curKey) => {
            const curValue = (props.overrides || {})[curKey];
            if (PADDING_PROPERTIES.includes(curKey) && curValue) {
                acc += `${curKey}: ${curValue};`;
            }
            return acc;
        }, '');
    }}
    padding: ${(props) => props.overrides?.padding || '2em 0'};
`;

export const GenericHeading = styled.h2<GenericStyledProps>`
    padding: ${(props) => props.overrides?.padding || '0 10vw 0.5em'};
`;
