import {
    DefaultTheme,
    AppBarTheme,
    BaseTheme,
    ContainerTheme,
    MenuTheme
} from 'styled-components';

const themeColors = {
    graphite: "#282c34",
    honeycombOrange: "#ffbd33",
    honeycombYellow: "#ffeb3b",
    plBlue: "#003472",
    plBackgroundYellow: "#fdfaea",
    // prism-tomorrow
    commentGray: "#999999",
    keywordPurple: "#cc99cd",
    numberOrange: "#f08d49",
    operatorAqua: "#67cdcc",
    stringGreen: "#7ec699",
    white: "#ffffff",
};

// TODO: better naming scheme for these schemes? Something more generalized?
const defaultTheme: DefaultTheme = {
    // backgroundColor: themeColors.plBackgroundYellow,
    // color: themeColors.plBlue,
    backgroundColor: themeColors.commentGray,
    color: themeColors.keywordPurple,
    height: "100%",
    width: "100%"
};

const appBarTheme: AppBarTheme = {
    // backgroundColor: themeColors.honeycombOrange,
    // color: themeColors.plBlue,
    backgroundColor: themeColors.graphite,
    color: themeColors.white,
};

const baseTheme: BaseTheme = {
    // backgroundColor: themeColors.plBackgroundYellow,
    backgroundColor: themeColors.commentGray,
    borderRadius: "1px solid red",
    // color: themeColors.plBlue,
    color: themeColors.keywordPurple,
};

const containerTheme: ContainerTheme = {
    height: "100%",
    textAlign: "center",
    width: "100%"
};

const menuTheme: MenuTheme = {
    backgroundColor: themeColors.commentGray,
    color: themeColors.graphite,
}

export {
    defaultTheme,
    appBarTheme,
    baseTheme,
    containerTheme,
    menuTheme
};
