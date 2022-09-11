import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
    siteMetadata: {
        title: 'wait, wut?',
        siteUrl: 'https://saurookadook.github.io',
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    pathPrefix: '/waitwut',
    plugins: [
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: `sheet`,
                path: `${__dirname}/sheet`,
            }
        },
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                gatsbyRemarkPlugins: ["gatsby-remark-prismjs", "gatsby-remark-autolink-headers"]
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
                            classPrefix: "language-",
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            aliases: {
                                'sh': 'bash'
                            },
                            showLineNumbers: true,
                        }
                    }
                ]
            }
        }
    ],

    /**
     * misc devDependencies
     * "@babel/core": "^7.0.0-0",
     * "@babel/plugin-syntax-flow": "^7.14.5",
     * "@babel/plugin-transform-react-jsx": "^7.14.9",
     */
}

export default config
