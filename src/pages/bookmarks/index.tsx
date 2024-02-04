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

const BookmarksListPage = ({
    data, // <- to force formatting
}: {
    data: ListPageData;
}): React.ReactElement => {
    const { nodes } = data.allMdx || {};

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* <SheetContentContainer container spacing={12}> */}
            <SheetContentContainer>
                {(nodes || []).length > 0 ? (
                    <StyledUl>
                        {(nodes || []).map(
                            (node: NodeFromQuery): React.ReactElement => (
                                <SheetLineItem key={node.fields.slug}>
                                    {/*
                                    TODO: add thumbnails!
                                    maybe using devicon? https://devicon.dev/
                                */}
                                    <SheetLineItemLink to={`/bookmarks/${node.fields.slug}`}>
                                        {(node.frontmatter || {}).title || node.fields.slug}
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

// prettier-ignore
export const query = graphql`
    query {
        allMdx(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { sectionSlug: { eq: "bookmarks" } } }
        ) {
            nodes {
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                }
                id
                fields {
                    slug
                }
            }
        }
    }
`;

export default BookmarksListPage;
