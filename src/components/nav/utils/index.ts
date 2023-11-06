import { PageMap } from 'common/constants/pageMap';

interface AddNodesToChildrenArgs {
    nodes: NodeFromQuery[];
    children: NavLinkItem[];
}

function addNodesToChildren({ nodes, children }: AddNodesToChildrenArgs): void {
    nodes.forEach((node: NodeFromQuery) => {
        children &&
            children.push({
                slug: node.slug.replace(/(\w+?\/){1,}/g, ''),
                label: node.frontmatter?.title || node.slug,
                iconName: node.frontmatter?.iconComponentName,
                // path: node.frontmatter?.fullPath
            });
    });
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
    for (const page of pageMap) {
        const navLink = {
            slug: page.sectionSlug,
            label: page.title,
            children: [] as NavLinkItem[],
        };

        const nodeGroup = nodesGroups.find((node) => node.fieldValue === page.sectionSlug);

        if (nodeGroup && nodeGroup.nodes) {
            addNodesToChildren({
                nodes: nodeGroup?.nodes,
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
