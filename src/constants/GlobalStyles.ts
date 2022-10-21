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
        min-height: 100vh;
    }

    main {
        color: #232129;
        font-family: "-apple-system, Roboto, sans-serif, serif";
        padding: 96px;
    }

    h1 {
        font-size: 3em;
        margin-top: 0;
        margin-bottom: 0.5em;
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

    a {
        text-decoration: none;

        &:hover {
            transform: scale(1.02);
        }
    }

    p {
        /* margin-bottom: 48px; */
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

    .heading-accent {
        color: #663399;
        font-size: 0.75em;
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

    .doc-link {
        .basic-link

        display: inline-block;
        list-style-type: none;
        margin-right: 12px;
        margin-bottom: 24px;
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

    .description {
        color: #232129;
        font-size: 14px;
        line-height: 1.25;
        margin-top: 10px;
        margin-bottom: 0px;
    }
`;

export default GlobalStyles;
