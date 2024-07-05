import { createGlobalStyle } from 'styled-components';

import { minWidth600 } from 'styles/mq';
import { defaultColors, resumeTheme, themeColors } from 'themes/index';

const GlobalStyles = createGlobalStyle`
    :root,
    html {
        background-color: ${(props) => props?.theme?.backgroundColor || defaultColors.backgroundColor} !important;
    }

    html,
    body,
    main {
        min-height: 100vh;
    }

    /* TODO: can maybe remove this? */
    body[id],
    main {
        background-color: ${(props) => props?.theme?.backgroundColor || defaultColors.backgroundColor};
    }

    body {
        &,
        & main {
            max-height: 100%;

            ${minWidth600} {
                /* 5rem is height of footer */
                height: calc(100% - 5rem);
            }
        }

        & #___gatsby,
        & #gatsby-focus-wrapper {
            /* height: calc(100% - 5rem); */
            height: auto;
            min-height: calc(100vh - 9rem); /* 100vh - (header + footer) */

            ${minWidth600} {
                height: 100%;
            }
        }

        & {
            margin: 0;
            overflow-x: clip;
            overscroll-behavior-y: none; /* TODO: only apply this for "desktop"? */
        }

        & main {
            color: #232129;
            font-family: "-apple-system, Roboto, sans-serif, serif";
            /* padding: 96px; */
        }

        & h1 {
            font-size: 3rem;
            margin-top: 0;
        }

        & h2 {
            font-size: 2.5rem;
        }

        & h3 {
            font-size: 2rem;
        }

        & h4 {
            font-size: 1.75rem;
        }

        & h5 {
            font-size: 1.5rem;
        }

        & summary > * {
            display: inline-block;
            margin-left: 0.5rem;
        }

        & ul,
        & ol {
            margin-block-end: 0;
            margin-block-start: 0;
            padding-inline-start: 1.5rem;

            ${minWidth600} {
                padding-inline-start: 2.5rem;
            }
        }

        & a {
            text-decoration: none;

            &:hover {
                transform: scale(1.02);
                transform-origin: left;
            }
        }
    }
`;

const WaitwutStyles = createGlobalStyle`
    #waitwut {
        padding-top: 6rem;

        &,
        & main {
            background-color: ${(props) => props?.theme?.backgroundColor};
            color: ${themeColors.graphite};
        }

        & [role='presentation'],
        & [role='presentation'] .MuiDrawer-paper {
            width: 100vw;
        }

        & ul,
        & ol {
            list-style: initial;
        }

        & li,
        & a {
            height: auto;
            width: fit-content;
        }

        & ul {
            margin-top: 0.5rem;
            margin-bottom: 0.75rem;
        }

        & ol li::marker {
            font-weight: 900;
        }

        & li {
            font-size: 1.125rem;
            font-weight: 300;
            margin-bottom: 0.25rem;
        }

        & h1,
        & h2,
        & h3,
        & h4,
        & h5,
        & p {
            margin-bottom: 0.5rem;
        }

        & code {
            /* background-color: #FFF4DB; */
            border-radius: 4px;
            /* color: #8A6534; */
            font-size: 1.25rem;
            padding: 4px;
        }


        /* https://css-tricks.com/examples/hrs/ */
        & hr {
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

        & .doc-list {
            padding-left: 0;
        }

        & .link-list {
            margin-bottom: 96px;
            padding-left: 0;
        }

        & .basic-link {
            color: #8954A8;
            font-weight: bold;
            vertical-align: 5%;
        }

        & .badge {
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

        & #sheet-page-content {
            & a {
                color: ${themeColors.darkerPurpleHex};
                display: inline-block;
            }
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
            padding: 1.5rem 0;

            ${minWidth600} {
                padding: 2.5rem 0;
            }
        }

        section .generic-container {
            padding-top: 2rem;
            padding-bottom: 2rem;

            & .generic-heading {
                padding-right: 5vw;
                padding-left: 5vw;

                ${minWidth600} {
                    padding-right: 10vw;
                    padding-left: 10vw;
                }
            }
        }

        & h1,
        & h2,
        & h3,
        & p {
            margin-top: 0;
            margin-bottom: 0;
        }

        & h1,
        & h2 {
            font-family: 'Arial Black', Arial, Helvetica, sans-serif;
        }

        & h1 {
            font-size: 2.5rem;

            ${minWidth600} {
                font-size: 4rem;
            }
        }

        h2 {
            font-size: 1.75rem;

            ${minWidth600} {
                font-size: 3.5rem;
            }
        }

        h3 {
            font-size: 1.5rem;

            ${minWidth600} {
                font-size: 2.75rem;
            }
        }

        & p {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.2rem;
            line-height: 1.25;

            ${minWidth600} {
                font-size: 1.5rem;
                line-height: 1.25;
            }
        }

        & li {
            font-size: 1.2rem;

            ${minWidth600} {
                font-size: 1.5rem;
            }
        }
    }
`;

export { GlobalStyles, WaitwutStyles, ResumeStyles };
