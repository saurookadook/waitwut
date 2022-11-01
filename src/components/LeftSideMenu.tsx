import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import { Drawer } from '@mui/material';

import { MenuNavLink } from './nav';
import { PageMapContext } from '../common/contexts';

import { menuTheme } from '../themes';

const StyledDrawer = styled(Drawer)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    color: ${(props) => props.theme?.color};

    & > .MuiDrawer-paper {
        background-color: ${(props) => props?.theme?.backgroundColor};
        border: none;
        color: ${(props) => props.theme?.color};
        padding-top: 6em;
        padding-left: 1em;
    }
`;

export const useSheetsQuery = (): MdxNodes => {
    const { allMdx } = useStaticQuery(
        graphql`
        query {
            allMdx(sort: { fields: frontmatter___title, order: DESC }) {
                nodes {
                    frontmatter {
                        title
                        fullPath
                        iconComponentName
                    }
                    id
                    slug
                }
            }
        }
    `,
    );
    return allMdx;
};

const drawerWidth = 240;

const LeftSideMenu = (): React.ReactElement => {
    const { nodes } = useSheetsQuery();
    const pageMapContext = useContext(PageMapContext);

    const navLinks: NavLinkItem[] = pageMapContext.pageMap.map((record) => {
        return {
            slug: record.sectionSlug,
            label: record.title,
            children: []
        }
    })

    if ((nodes || []).length > 0) {
        navLinks[0].children = (nodes || []).map((node: NodeFromQuery): NavLinkItem => {
            return {
                slug: node.slug,
                label: node.frontmatter?.title || node.slug,
                iconName: node.frontmatter?.iconComponentName
                // path: node.frontmatter?.fullPath
            };
        });
    }

    return (
        <ThemeProvider theme={menuTheme}>
            <StyledDrawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {navLinks.map((navLink, index) => (
                    <MenuNavLink
                        depth={0}
                        key={`${index}:${navLink.slug}`}
                        navLink={navLink}
                    />
                ))}
            </StyledDrawer>
        </ThemeProvider>
    );
};

export default LeftSideMenu;
