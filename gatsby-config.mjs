import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

import netlifyAdapter from 'gatsby-adapter-netlify';
import remarkGfm from 'remark-gfm';
import remarkExternalLinks from 'remark-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// console.log(`      gatsby-config: ${__dirname}      `.padStart(120, '=').padEnd(240, '='));

const config = {
    adapter: netlifyAdapter.default({
        excludeDatastoreFromEngineFunction: false,
    }),
    siteMetadata: {
        title: 'wait, wut?',
        siteUrl: 'https://saurookadook.github.io',
    },
    pathPrefix: '/waitwut',
    trailingSlash: 'always',
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
                            maxWidth: 1200,
                        },
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
                mdxOptions: {
                    remarkPlugins: [
                        remarkGfm, // force formatting
                        [remarkExternalLinks, { target: true }],
                    ],
                    rehypePlugins: [
                        rehypeSlug, // force formatting
                        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    ],
                },
            },
        },
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
    ],

    /**
     * misc devDependencies
     * "@babel/core": "^7.0.0-0",
     * "@babel/plugin-syntax-flow": "^7.14.5",
     * "@babel/plugin-transform-react-jsx": "^7.14.9",
     */
};

export default config;
