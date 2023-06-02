import { createGlobalStyle } from 'styled-components';

import { themeColors } from '../themes';

const GlobalStyles = createGlobalStyle`
    html {
        background-color: ${(props) => props?.theme?.backgroundColor};
    }

    body#waitwut-body {
        background-color: ${(props) => props?.theme?.backgroundColor};
        color: ${themeColors.graphite};
        font-family: "-apple-system, Roboto, sans-serif, serif";
        font-size: 14px;
        margin: 0;
        min-height: 100vh;
        overscroll-behavior-y: none; /* TODO: only apply this for "desktop"? */
    }

    main {
        color: #232129;
        font-family: "-apple-system, Roboto, sans-serif, serif";
        /* padding: 96px; */
    }

    h1, h2, h3, h4, h5 {
        margin-bottom: 0.5em;
    }

    h1 {
        font-size: 3em;
        margin-top: 0;
    }

    h1:first-of-type {
        margin-top: 1em;
    }

    h2 {
        font-size: 2.5em;
    }

    h3 {
        font-size: 2em;
    }

    h4 {
        font-size: 1.75em;
    }

    h5 {
        font-size: 1.5em;
    }

    summary > * {
        display: inline-block;
        margin-left: 0.5em;
    }

    a {
        text-decoration: none;

        &:hover {
            transform: scale(1.02);
        }
    }

    p {
        /* margin-bottom: 48px; */
    }

    ol li::marker {
        font-weight: 900;
    }

    ul {
        margin-top: 0.5em;
    }

    li {
        font-size: 18px;
        font-weight: 300;
        margin-bottom: 0.25em;
        /* max-width: 560px; */

        & a {
            color: ${themeColors.darkerPurpleHex};
        }
    }

    code {
        color: #8A6534;
        padding: 4px;
        background-color: #FFF4DB;
        font-size: 1.25rem;
        border-radius: 4px;
    }


    /* https://css-tricks.com/examples/hrs/ */
    hr {
        border: 0 none;
        margin: 2em 0;
        opacity: 1;
        width: 100%;

        border-top: 1px solid ${themeColors.darkerPurpleHex};

        /* height: 1px; */
        /* color: ${themeColors.darkerPurpleHex}; */
        /* background: ${themeColors.darkerPurpleHex}; */
        /* background-image: linear-gradient(to right, ${themeColors.keywordPurple}, ${themeColors.darkerPurpleHex}, ${themeColors.keywordPurple}); */
    }

    .doc-list {
        padding-left: 0;
    }

    .link-list {
        margin-bottom: 96px;
        padding-left: 0;
    }

    .basic-link {
        color: #8954A8;
        font-size: 16px;
        font-weight: bold;
        vertical-align: 5%;
    }

    .badge {
        background-color: #088413;
        border: 1px solid #088413;
        border-radius: 4px;
        color: #ffffff;
        display: inline-block;
        font-size: 11px;
        font-weight: bold;
        letter-spacing: 1;
        line-height: 1;
        margin-left: 10px;
        padding: 4px 6px;
        position: relative;
        top: -2px;
    }
`;

export default GlobalStyles;
