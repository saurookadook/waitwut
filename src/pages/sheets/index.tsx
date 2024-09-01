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

// TODO: this and the bookmarks list page component could be the same lol
const SheetsPage = ({
    data, // force formatting
}: {
    data: ListPageData;
}): React.ReactElement => {
    // console.log('SheetsPage - data: ', data);
    const { nodes } = data.allMdx || {};

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* <SheetContentContainer container spacing={12}> */}
            <SheetContentContainer>
                {(nodes || []).length > 0 ? (
                    <StyledUl>
                        {(nodes || []).map(
                            (node: NodeFromQuery): React.ReactElement => (
                                <SheetLineItem key={node.slug}>
                                    {/*
                                    TODO: add thumbnails!
                                    maybe using devicon? https://devicon.dev/
                                */}
                                    <SheetLineItemLink to={`/sheets/${node.slug}`}>
                                        {(node.frontmatter || {}).title || node.slug}
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
        allMarkdownRemark(
            sort: { fields: frontmatter___date, order: DESC }
            filter: { frontmatter: { sectionSlug: { eq: "sheets" } } }
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

export default SheetsPage;
