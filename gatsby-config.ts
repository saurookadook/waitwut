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
  plugins: [],

  /**
   * misc devDependencies
   * "@babel/core": "^7.0.0-0",
   * "@babel/plugin-syntax-flow": "^7.14.5",
   * "@babel/plugin-transform-react-jsx": "^7.14.9",
   */
}

export default config
