import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../../components/Layout'


const DocSheet = ({ data }: DocSheetProps) => {
    console.log('DocSheet - data: ', data);

    return (
        // <Layout pageTitle="Super Cool Blog Posts">
        //   <p>My blog post contents will go here (eventually).</p>
        // </Layout>
        <>
            <h1>{data.mdx.frontmatter.title}</h1>
            <MDXRenderer>
                {data.mdx.body}
            </MDXRenderer>
        </>
    )
}

export const query = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
            }
            body
        }
    }
`;

export default DocSheet
