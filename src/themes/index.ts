import {
    DefaultTheme,
    AppBarTheme,
    BaseTheme,
    ContainerTheme
} from 'styled-components';

const themeColors = {
    graphite: "#282c34",
    honeycombOrange: "#ffbd33",
    honeycombYellow: "#ffeb3b",
    plBlue: "#003472",
    plBackgroundYellow: "#fdfaea",
    white: "#ffffff"
};

// TODO: better naming scheme for these schemes? Something more generalized?
const defaultTheme: DefaultTheme = {
    backgroundColor: themeColors.plBackgroundYellow,
    color: themeColors.plBlue,
    height: "100%",
    width: "100%"
};

const appBarTheme: AppBarTheme = {
    backgroundColor: themeColors.honeycombOrange,
    color: themeColors.plBlue,
};

const baseTheme: BaseTheme = {
    backgroundColor: themeColors.plBackgroundYellow,
    borderRadius: "1px solid red",
    color: themeColors.plBlue,
};

const containerTheme: ContainerTheme = {
    height: "100%",
    textAlign: "center",
    width: "100%"
};

export {
    defaultTheme,
    appBarTheme,
    baseTheme,
    containerTheme
};
