import * as React from 'react';
import { Link, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import { Container, Typography } from '@mui/material';

import { defaultTheme } from 'themes';

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
    color: ${(props) => props?.theme?.color};
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`;

const NotesListPage = ({
    data, // force formatting
}: {
    data: ListPageData;
}): React.ReactElement => {
    // console.log('NotesListPage - data: ', data);
    const { nodes: mdxNodes } = data.allMdx || {};
    const { nodes: markdownNodes } = data.allMarkdownRemark || {};

    const nodes = ([] as NodeFromQuery[]).concat(mdxNodes, markdownNodes);

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* <SheetContentContainer container spacing={12}> */}
            <SheetContentContainer>
                {(nodes || []).length > 0 ? (
                    <StyledUl>
                        {(nodes || []).map(
                            (node: NodeFromQuery): React.ReactElement => (
                                <SheetLineItem key={node.frontmatter.fullPath || node.slug}>
                                    {/*
                                        TODO: add thumbnails!
                                        maybe using devicon? https://devicon.dev/
                                    */}
                                    <SheetLineItemLink to={node.frontmatter.fullPath || `/notes/${node.slug}`}>
                                        {node.frontmatter.title || node.slug}
                                    </SheetLineItemLink>
                                </SheetLineItem>
                            ),
                        )}
                    </StyledUl>
                ) : (
                    <Typography variant="h2">{`Some day, I'll have content 🙂`}</Typography>
                )}
            </SheetContentContainer>
        </ThemeProvider>
    );
};

export const query = graphql`
    query {
        allMdx(
            sort: { fields: frontmatter___date, order: DESC }
            filter: { frontmatter: { sectionSlug: { eq: "notes" } } }
        ) {
            nodes {
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    fullPath
                    sectionSlug
                    title
                }
                id
                slug
            }
        }
        allMarkdownRemark(
            sort: { fields: frontmatter___date, order: DESC }
            filter: { frontmatter: { sectionSlug: { eq: "notes" } } }
        ) {
            nodes {
                fields {
                    pathComponents
                }
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    fullPath
                    sectionSlug
                    title
                }
            }
        }
    }
`;

export default NotesListPage;
