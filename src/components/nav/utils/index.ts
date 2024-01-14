import { PageMap } from 'common/constants/pageMap';

interface AddNodesToChildrenArgs {
    children: NavLinkItem[];
    nodes: NodeFromQuery[];
    parentPath?: string;
}

function addNodesToChildren({ children, nodes, parentPath = '' }: AddNodesToChildrenArgs): NodeFromQuery[] {
    // if (parentPath.includes('bookmarks')) {
    //     console.log(' addNodesToChildren '.padStart(80, '=').padEnd(160, '='));
    //     console.log(JSON.parse(JSON.stringify({ nodes, children, parentPath })));
    // }

    const nodeParents: any = {};
    let parentSlug;

    nodes.forEach((node: NodeFromQuery) => {
        children &&
            children.push({
                slug: node.slug.replace(/(\w+?\/){1,}/g, ''),
                label: node.frontmatter?.title || node.slug,
                iconName: node.frontmatter?.iconComponentName,
                fullPath: node.frontmatter?.fullPath,
            });
    });

    // nodes.forEach((node: NodeFromQuery) => {
    //     const pathComponents: string[] = node.slug.match(/[^\/]+[^\/]/g) || [];
    //     // if (node.frontmatter.fullPath?.includes('bookmarks')) {
    //     //     console.log(JSON.parse(JSON.stringify({ children, node, parentPath, pathComponents })));
    //     // }

    //     if (pathComponents.length === 1) {
    //         children.push({
    //             slug: node.slug.replace(/(\w+?\/){1,}/g, ''),
    //             fullPath: node.frontmatter?.fullPath,
    //             label: node.frontmatter?.title || node.slug,
    //             iconName: node.frontmatter?.iconComponentName,
    //             pathComponents: pathComponents,
    //         });
    //         return;
    //     }

    //     parentSlug = pathComponents[0];

    //     if (pathComponents.length > 0 && !nodeParents[parentSlug]) {
    //         nodeParents[parentSlug] = {
    //             slug: parentSlug,
    //             label: parentSlug[0].toUpperCase() + parentSlug.slice(1), // TODO: capitlize it
    //             children: [],
    //         };
    //     }

    //     nodeParents[parentSlug].children.push({
    //         slug: node.slug.replace(/(\w+?\/){1,}/g, ''),
    //         fullPath: node.frontmatter?.fullPath,
    //         label: node.frontmatter?.title || node.slug,
    //         iconName: node.frontmatter?.iconComponentName,
    //         pathComponents: pathComponents,
    //     });
    // });

    // Object.values(nodeParents).forEach((nodeParent) => {
    //     children && children.push(nodeParent as NavLinkItem);
    // });

    // console.log(' addNodesToChildren - END '.padStart(80, '=').padEnd(160, '='));
    // console.log(JSON.parse(JSON.stringify({ children, nodes })));
    return nodes;
}

interface CreateNavLinksArgs {
    nodesGroups: GroupFromQuery[];
    pageMap: PageMap[];
    parentNavLink?: NavLinkItem;
    navLinksResult?: NavLinkItem[];
}

// TODO: figure out better way to handle childSections
// - childSections are currently defined in pageMap, which is a static constant
function createNavLinks({
    nodesGroups,
    pageMap,
    parentNavLink,
    navLinksResult = [],
}: CreateNavLinksArgs): NavLinkItem[] {
    // console.log(' createNavLinks '.padStart(80, '=').padEnd(160, '='));
    // console.log(JSON.parse(JSON.stringify({ nodesGroups, pageMap, parentNavLink, navLinksResult })));
    for (const page of pageMap) {
        const navLink = {
            slug: page.sectionSlug,
            label: page.title,
            children: [] as NavLinkItem[],
        };

        const nodeGroup = nodesGroups.find((node) => node.fieldValue === page.sectionSlug);

        if (nodeGroup && nodeGroup.nodes) {
            // console.log(` addNodesToChildren for ${nodeGroup.fieldValue} `.padStart(80, '=').padEnd(160, '='));
            // console.log(JSON.parse(JSON.stringify({ nodeGroup: nodeGroup, page: page })));
            addNodesToChildren({
                nodes: nodeGroup.nodes,
                children: navLink.children,
                parentPath: nodeGroup.fieldValue,
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
