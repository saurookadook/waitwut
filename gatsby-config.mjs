import path from 'path';
import type { GatsbyConfig } from 'gatsby';
import netlifyAdapter from 'gatsby-adapter-netlify';

console.log(`      gatsby-config: ${__dirname}      `.padStart(120, "=").padEnd(240, "="))

const config: GatsbyConfig = {
    adapter: netlifyAdapter({
        excludeDatastoreFromEngineFunction: false,
    }),
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    siteMetadata: {
        title: 'wait, wut?',
        siteUrl: 'https://saurookadook.github.io',
    },
    pathPrefix: '/waitwut',
    trailingSlash: "always",
    plugins: [
        `gatsby-plugin-image`,
        'gatsby-plugin-styled-components',
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    'gatsby-remark-prismjs',
                    'gatsby-remark-autolink-headers',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 1200
                        }
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
                            classPrefix: 'language-',
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            aliases: {
                                sh: 'bash',
                            },
                            showLineNumbers: true,
                        },
                    },
                ],
            },
        },
        // {
        //     resolve: `gatsby-transformer-remark`,
        //     options: {
        //         plugins: [
        //             {
        //                 resolve: `gatsby-remark-prismjs`,
        //                 options: {
        //                     // https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
        //                     classPrefix: 'language-',
        //                     // This is used to allow setting a language for inline code
        //                     // (i.e. single backticks) by creating a separator.
        //                     // This separator is a string and will do no white-space
        //                     // stripping.
        //                     // A suggested value for English speakers is the non-ascii
        //                     // character '›'.
        //                     inlineCodeMarker: null,
        //                     aliases: {
        //                         sh: 'bash',
        //                     },
        //                     showLineNumbers: true,
        //                 },
        //             },
        //         ],
        //     },
        // },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: `Bookmarks`,
                path: path.resolve(__dirname, `docs/bookmarks`),
            },
        },
        {
            resolve: 'gatsby-plugin-page-creator',
            options: {
                path: path.resolve(__dirname, `docs/bookmarks`),
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: `Notes`,
                path: path.resolve(__dirname, `docs/notes`),
            },
        },
        {
            resolve: 'gatsby-plugin-page-creator',
            options: {
                path: path.resolve(__dirname, `docs/notes`),
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: `Sheets`,
                path: path.resolve(__dirname, `docs/sheets`),
            },
        },
        {
            resolve: 'gatsby-plugin-page-creator',
            options: {
                path: path.resolve(__dirname, `docs/sheets`),
            },
        },
        // TODO: https://github.com/andreabreu-me/gatsby-plugin-prettier-eslint/issues/11
        // {
        //     resolve: "gatsby-plugin-prettier-eslint",
        //     // this is the default configuration, override only what you need
        //     options: {
        //         cwd: process.cwd(), // path to a directory that should be considered as the current working directory
        //         watch: true, // format/lint on save
        //         initialScan: true, // if true, will format/lint the whole project on Gatsby startup
        //         onChangeFullScanLint: false, // if true, on file save always perform full scan lint
        //         onChangeFullScanFormat: false, // if true, on file save always perform full scan format
        //         prettierLast: false, // if true, will run Prettier after ESLint
        //         ignorePatterns: [
        //             "**/node_modules/**/*",
        //             "**/.git/**/*",
        //             "**/dist/**/*",
        //             ".cache/**/*",
        //             "public/**/*",
        //         ],
        //         prettier: {
        //             patterns: [
        //                 "**/*.{css,scss,less}",
        //                 "**/*.{json,json5}",
        //                 "**/*.{graphql}",
        //                 "**/*.{md,mdx}",
        //                 "**/*.{html}",
        //                 "**/*.{yaml,yml}",
        //             ], // string or array of paths/files/globs to include related only to Prettier
        //             ignorePatterns: [], // string or array of paths/files/globs to exclude related only to Prettier
        //             customOptions: {}, // see: https://prettier.io/docs/en/options.html
        //         },
        //         eslint: {
        //             patterns: ["**/*.{js,jsx,ts,tsx}"], // string or array of paths/files/globs to include related only to ESLint
        //             ignorePatterns: [], // string or array of paths/files/globs to exclude related only to ESLint
        //             formatter: "stylish", // set custom or third party formatter
        //             maxWarnings: undefined, // number of max warnings allowed, when exceed it will fail Gatsby build
        //             emitWarning: true, // if true, will emit lint warnings
        //             failOnError: false, // if true, any lint error will fail the build, you may set true only in your prod config
        //             failOnWarning: false, // same as failOnError but for warnings
        //             plugins: [], // an array of plugins to load for ESLint
        //             customOptions: {}, // see: https://eslint.org/docs/developer-guide/nodejs-api#cliengine
        //         },
        //     },
        // },
    ],

    /**
     * misc devDependencies
     * "@babel/core": "^7.0.0-0",
     * "@babel/plugin-syntax-flow": "^7.14.5",
     * "@babel/plugin-transform-react-jsx": "^7.14.9",
     */
};

export default config;
