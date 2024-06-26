import {
    DefaultTheme, // force formatting
    AppBarTheme,
    BaseTheme,
    ContainerTheme,
    MenuTheme,
} from 'styled-components';

const themeColors = {
    blackHex: '#000000',
    blackRgb: 'rgb(0, 0, 0)',
    graphite: '#282c34',
    graphiteRgb: {
        r: 40,
        g: 44,
        b: 52,
    },
    honeycombOrange: '#ffbd33',
    honeycombYellow: '#ffeb3b',
    plBlue: '#003472',
    plBackgroundYellow: '#fdfaea',
    // prism-tomorrow
    commentGray: '#999999',
    commentGrayRgb: {
        r: 153,
        g: 153,
        b: 153,
    },
    keywordPurple: '#cc99cd',
    darkerPurpleRgb: 'rgb(85, 26, 139)',
    darkerPurpleHex: '#551a8b',
    numberOrange: '#f08d49',
    operatorAqua: '#67cdcc',
    stringGreen: '#7ec699',
    white: '#ffffff',
    whiteRgb: 'rgb(255, 255, 255)',
};

const defaultColors = {
    backgroundColor: themeColors.commentGray,
    backgroundColorRgb: themeColors.commentGrayRgb,
    color: themeColors.graphite,
};

// TODO: better naming scheme for these schemes? Something more generalized?
const defaultTheme: DefaultTheme = {
    ...defaultColors,
    // backgroundColor: themeColors.plBackgroundYellow,
    // color: themeColors.plBlue,
    // color: themeColors.keywordPurple,
    height: '100%',
    width: '100%',
};

const appBarTheme: AppBarTheme = {
    ...defaultColors,
    // backgroundColor: themeColors.honeycombOrange,
    // color: themeColors.plBlue,
    backgroundColor: themeColors.graphite,
    backgroundColorRgb: themeColors.graphiteRgb,
    color: themeColors.white,
};

const baseTheme: BaseTheme = {
    // backgroundColor: themeColors.plBackgroundYellow,
    backgroundColor: themeColors.commentGray,
    borderRadius: '1px solid red',
    // color: themeColors.plBlue,
    color: themeColors.keywordPurple,
};

const containerTheme: ContainerTheme = {
    height: '100%',
    textAlign: 'center',
    width: '100%',
};

const menuTheme: MenuTheme = {
    backgroundColor: themeColors.commentGray,
    color: themeColors.graphite,
};

const resumeTheme = {
    backgroundColor: '#ffffff',
    oldResumeBgHex: '#f3f3f3',
    oldResumeLinkHex: '#0097a7',
    oldResumeLinkRgb: 'rgb(0, 151, 167)',
    // Pluralsight
    pluralsightPinkHex: '#fe1676',
    pluralsightPinkRgb: 'rgb(254, 22, 118)',
    // from Pando
    // psActionTextHex: 'var(--ps-action-text)',
    psActionTextHex: '#e1ddf7',
    // psBackgroundHex: 'var(--ps-background)',
    psBackgroundHex: '#393b6b',
    // psSuccessTextWeakHex: 'var(--ps-success-text-weak)',
    psSuccessTextWeakHex: '#43fd84',
    // psTextInverseHex: 'var(--ps-text-inverse)',
    psTextInverseHex: '#130f25',
    // psSurfaceHex: 'var(--ps-surface)',
    psSurfaceHex: '#130f25',
    // psWarningTextMediumHex: 'var(--ps-warning-text-medium)',
    psWarningTextMediumHex: '#ffd262',
    // Salesforce
    salesforceBgHex: '#ffffff',
    salesforceBeigeBgRgb: 'rgb(255, 241, 234)',
    salesforceShadyBeigeBgRgb: 'rgb(243, 243, 243)',
    salesforceLightBlueHex: '#36a1e0',
    salesforceMidBlueRgb: 'rgb(1, 118, 211)',
    salesforceDarkBlueRgb: 'rgb(3, 45, 96)',
    // Evergage
    evergageBlueHex: '#2e8cc8',
    evergageGreenHex: '#7bb93d',
    evergageGrayHex: '#7a7c7c',
    // Upstatement
    upstatementLinkUnderline: '#858585',
    // BSO
    bsoBgHex: '#ffda81',
    bsoTextHex: '#000000',
};

export {
    themeColors, // force formatting
    defaultColors,
    defaultTheme,
    appBarTheme,
    baseTheme,
    containerTheme,
    menuTheme,
    resumeTheme,
};
