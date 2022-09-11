import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import {
    Container,
    Typography
} from '@mui/material';

const SheetContentContainer = styled(Container)`
    text-align: center;
`;

const StyledUl = styled.ul`
    width: 100%;
`;

const SheetLineItem = styled.li`
    /* display: inline-block; */
    list-style: none;
    /* max-width: 50%; */
    text-align: center;
    width: 100%;
`;

const SheetLineItemLink = styled(Link)`
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
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
            {(nodes || []).length > 0 ? (
                <StyledUl>
                    {nodes.map((node: NodeFromQuery): React.ReactElement => (
                        <SheetLineItem key={node.slug}>
                            {/*
                                TODO: add thumbnails!
                                maybe using devicon? https://devicon.dev/
                            */}
                            <SheetLineItemLink to={`/sheet/${node.slug}`}>
                                {(node.frontmatter || {}).title || node.slug}
                            </SheetLineItemLink>
                        </SheetLineItem>
                    ))}
                </StyledUl>) : (
                <Typography variant="h2">
                    {`Some day, I'll have content 🙂`}
                </Typography>
            )}
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
