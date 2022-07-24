import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
    Box,
    CssBaseline,
    Container,
    Typography
} from '@mui/material';

const SheetContentContainer = styled(Container)`
    text-align: center;
`;

interface NodeFrontmatter {
    date?: Date;
    title: string;
}

interface NodeFromQuery {
    name: string;
    slug: string;
    frontmatter: NodeFrontmatter;
}

interface MdxNodes {
    nodes: NodeFromQuery[];
}

interface SheetPageData {
    allMdx: MdxNodes;
}

interface SheetPageProps {
    data: SheetPageData;
}

const SheetPage = ({ data }: SheetPageProps) => {
    console.log('SheetPage - data: ', data)
    const { nodes } = data.allMdx || {}

    return (
        // <SheetContentContainer container spacing={12}>
        <SheetContentContainer>
            <Typography variant="h2">
                {`Some day, I'll have content 🙂`}
            </Typography>
            <ul>
                {nodes.map((node: NodeFromQuery): React.ReactElement => (
                    <li key={node.slug}>
                        <Link to={`/sheet/${node.slug}`}>
                            {(node.frontmatter || {}).title || node.slug}
                        </Link>
                    </li>
                ))}
            </ul>
        </SheetContentContainer>
    );
};

export const query = graphql`
    query {
        allMdx(sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                }
                id
                slug
            }
        }
    }
`;

export default SheetPage;
