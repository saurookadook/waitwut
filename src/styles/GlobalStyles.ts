import { createGlobalStyle } from 'styled-components';

import { listItemPadding } from 'resume/components';
import { defaultColors, resumeTheme, themeColors } from 'themes/index';

const GlobalStyles = createGlobalStyle`
    :root,
    html {
        background-color: ${(props) => props?.theme?.backgroundColor || defaultColors.backgroundColor} !important;
    }

    body,
    main {
        background-color: ${(props) => props?.theme?.backgroundColor || defaultColors.backgroundColor};
    }

    body#waitwut,
    body#resume {
        & {
            font-family: "-apple-system, Roboto, sans-serif, serif";
            font-size: var(--base-font-size);
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
            margin-bottom: 0.5rem;
        }

        h1 {
            font-size: 3rem;
            margin-top: 0;
        }

        h1:first-of-type {
            margin-top: 1rem;
        }

        h2 {
            font-size: 2.5rem;
        }

        h3 {
            font-size: 2rem;
        }

        h4 {
            font-size: 1.75rem;
        }

        h5 {
            font-size: 1.5rem;
        }

        summary > * {
            display: inline-block;
            margin-left: 0.5rem;
        }

        a {
            text-decoration: none;

            &:hover {
                transform: scale(1.02);
            }
        }
    }
`;

const WaitwutStyles = createGlobalStyle`
    #waitwut {
        &body,
        & main {
            background-color: ${(props) => props?.theme?.backgroundColor};
            color: ${themeColors.graphite};
        }

        & [role='presentation'],
        & [role='presentation'] .MuiDrawer-paper {
            width: 100vw;
        }

        ul,
        ol {
            list-style: initial;
        }

        ul {
            margin-top: 0.5rem;
            margin-bottom: 0.75rem;
        }

        ol li::marker {
            font-weight: 900;
        }

        li {
            font-size: 1.125rem;
            font-weight: 300;
            margin-bottom: 0.25rem;
            /* max-width: 560px; */

            & a {
                color: ${themeColors.darkerPurpleHex};
            }
        }

        p {
            margin-bottom: 0.5rem;
        }

        code {
            /* background-color: #FFF4DB; */
            border-radius: 4px;
            /* color: #8A6534; */
            font-size: 1.25rem;
            padding: 4px;
        }


        /* https://css-tricks.com/examples/hrs/ */
        hr {
            border: 0 none;
            margin: 2rem 0;
            opacity: 1;
            width: 100%;

            border-top: 1px solid ${themeColors.darkerPurpleHex};

            /* height: 1px; */
            /* color: ${themeColors.darkerPurpleHex}; */
            /* background: ${themeColors.darkerPurpleHex}; */
            /* background-image: linear-gradient(to right,
                ${themeColors.keywordPurple},
                ${themeColors.darkerPurpleHex},
                ${themeColors.keywordPurple}
            ); */
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
    }
`;

const ResumeStyles = createGlobalStyle`
    #resume {
        & main {
            background: linear-gradient(${resumeTheme.psSuccessTextWeakHex} 0 50%, ${themeColors.plBlue} 50% 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 2.5rem 0;
        }

        & h1,
        & h2,
        & p {
            margin-top: 0;
            margin-bottom: 0;
        }

        & h1,
        & h2 {
            font-family: 'Arial Black', Arial, Helvetica, sans-serif;
        }

        & h1 {
            font-size: 4rem;
        }

        h2 {
            font-size: 3.5rem;
        }

        h3 {
            font-size: 2.75rem;
        }

        & p {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.5rem;
            line-height: 1.25;
        }

        & li {
            font-size: 1.75rem;
        }

        & .list-item {
            padding-left: ${listItemPadding};
        }
    }
`;

export { GlobalStyles, WaitwutStyles, ResumeStyles };
