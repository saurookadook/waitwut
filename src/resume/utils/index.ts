import { toKebabCase } from 'utils/index';

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

export function addPadding(overrides: StyleOverrides, defaultPadding: string): string {
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
