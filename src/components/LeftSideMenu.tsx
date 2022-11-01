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
                    group(field: frontmatter___sectionSlug) {
                        nodes {
                            frontmatter {
                                title
                                fullPath
                                iconComponentName
                            }
                            id
                            slug
                        }
                        fieldValue
                    }
                }
            }
        `,
    );
    return allMdx;
};

const drawerWidth = 240;

const LeftSideMenu = (): React.ReactElement => {
    const { group: nodesGroups } = useSheetsQuery();
    // const { pagesBySectionSlug } = useContext(PageMapContext);
    const { pageMap } = useContext(PageMapContext);

    const navLinks: NavLinkItem[] = pageMap.map((record) => {
        const navLinkItem = {
            slug: record.sectionSlug || "",
            label: record.title || "",
            children: [] as NavLinkItem[]
        }

        const nodeGroup = nodesGroups.find((node) => {
            return node.fieldValue === record.sectionSlug
        });

        if (((nodeGroup || {}).nodes || []).length > 0) {
            nodeGroup?.nodes.forEach((node: NodeFromQuery) => {
                navLinkItem.children.push({
                    slug: node.slug,
                    label: node.frontmatter?.title || node.slug,
                    iconName: node.frontmatter?.iconComponentName
                    // path: node.frontmatter?.fullPath
                });
            });
        }

        return navLinkItem;
    });

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
