import { PageMap } from 'common/constants/pageMap';

interface AddNodesToChildrenArgs {
    children: NavLinkItem[];
    nodes: NodeFromQuery[];
    parentPath?: string;
}

function addNodesToChildren({ children, nodes, parentPath = '' }: AddNodesToChildrenArgs): NodeFromQuery[] {
    console.log('addNodesToChildren: ', { nodes, children });

    nodes.forEach((node: NodeFromQuery) => {
        let nodeChildren;
        const pathComponents = (node.frontmatter?.fullPath || node.slug).match(/[^\/]+[^\/]/g) || [];
        if (node.slug === 'python') {
            console.log({ node, children, pathComponents });
        }
        if (pathComponents.length)

        children &&
            children.push({
                slug: node.slug.replace(/(\w+?\/){1,}/g, ''),
                label: node.frontmatter?.title || node.slug,
                iconName: node.frontmatter?.iconComponentName,
                pathComponents: pathComponents,
            });
    });

    return nodes;
}

interface CreateNavLinksArgs {
    nodesGroups: GroupFromQuery[];
    pageMap: PageMap[];
    parentNavLink?: NavLinkItem;
    navLinksResult?: NavLinkItem[];
}

function createNavLinks({
    nodesGroups,
    pageMap,
    parentNavLink,
    navLinksResult = [],
}: CreateNavLinksArgs): NavLinkItem[] {
    console.log('createNavLinks: ', { nodesGroups, pageMap, parentNavLink, navLinksResult });
    for (const page of pageMap) {
        const navLink = {
            slug: page.sectionSlug,
            label: page.title,
            children: [] as NavLinkItem[],
        };

        const nodeGroup = nodesGroups.find((node) => node.fieldValue === page.sectionSlug);
        console.log({ nodeGroup, page });

        if (nodeGroup && nodeGroup.nodes) {
            addNodesToChildren({
                nodes: nodeGroup.nodes,
                children: navLink.children,
            });
        }

        if (parentNavLink && parentNavLink.children) {
            parentNavLink.children.push(navLink);
        } else {
            navLinksResult.push(navLink);
        }

        if (page.childSections) {
            navLinksResult = createNavLinks({
                nodesGroups,
                pageMap: page.childSections,
                parentNavLink: navLink,
                navLinksResult,
            });
        }
    }

    return navLinksResult;
}

export { createNavLinks };
