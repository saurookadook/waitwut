import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        backgroundColor?: string;
        color?: string;
        height?: string;
        width?: string;
    }

    export interface AppBarTheme extends DefaultTheme {
        backgroundColor: string;
        color: string;
    }

    export interface BaseTheme extends DefaultTheme {
        borderRadius: string;
        color?: string;
    }

    export interface ContainerTheme extends DefaultTheme {
        height: string;
        textAlign: string;
        width: string;
    }

    export interface MenuTheme extends DefaultTheme {
        backgroundColor: string;
        color: string;
    }
}
