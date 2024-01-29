import { PageMap } from 'common/constants/pageMap';

type NodeParent = {
    [key: string]: NodeFromQuery | EmptyObject;
};

interface FindOrCreateSectionChildArgs {
    nodeParentMap: NodeParent | AmbiguousObject;
    pathSteps: string[];
    childSectionSlugs?: string[];
    currentParent?: NavLinkItem | EmptyObject;
    sectionChild?: NavLinkItem | EmptyObject;
}

function findOrCreateSectionChild({
    nodeParentMap,
    pathSteps,
    childSectionSlugs,
    currentParent = {},
    sectionChild = {},
}: FindOrCreateSectionChildArgs): NavLinkItem | null {
    const pathStep = pathSteps.shift();
    if (!pathStep) {
        return null;
    }

    if (childSectionSlugs && childSectionSlugs.includes(pathStep)) {
        if (!nodeParentMap[pathStep]) {
            nodeParentMap[pathStep] = {
                slug: `${pathStep}/`,
                children: [],
            };
        }

        currentParent = nodeParentMap[pathStep] as NavLinkItem;
    }

    if (pathSteps.length > 0) {
        return findOrCreateSectionChild({
            nodeParentMap,
            pathSteps: pathSteps,
            childSectionSlugs,
            currentParent,
            sectionChild,
        });
    }

    return currentParent;
}

function addMissingFieldsToSection(section: NavLinkItem, node: NodeFromQuery): void {
    Object.assign(section, {
        label: node.frontmatter?.title || node.slug,
        iconName: node.frontmatter?.iconComponentName,
        fullPath: node.frontmatter?.fullPath,
    });
}

function addNodeToChildren(children: NavLinkItem[], node: NodeFromQuery): void {
    children.push({
        slug: node.slug,
        label: node.frontmatter?.title || node.slug,
        iconName: node.frontmatter?.iconComponentName,
        fullPath: node.frontmatter?.fullPath,
    });
}

interface PopulateNavLinkChildren {
    children: NavLinkItem[];
    childSectionSlugs?: string[];
    nodes: NodeFromQuery[];
}

function populateNavLinkChildren({ children, childSectionSlugs, nodes }: PopulateNavLinkChildren): NodeFromQuery[] {
    const nodeParentMap: NodeParent = {};
    let pathSteps;

    nodes.forEach((node: NodeFromQuery) => {
        const { pathComponents } = node.fields;

        pathSteps = pathComponents.slice(1, pathComponents.length - 1);

        const sectionChild = findOrCreateSectionChild({
            nodeParentMap,
            pathSteps,
            childSectionSlugs,
        });

        if (sectionChild == null) {
            const trimmedSlug = node.slug.replace('/', '');
            if (nodeParentMap[trimmedSlug]) {
                return addMissingFieldsToSection(nodeParentMap[trimmedSlug], node);
            }

            return addNodeToChildren(children, node);
        }

        if (node.slug === sectionChild?.slug) {
            addMissingFieldsToSection(sectionChild, node);
        } else if (Array.isArray(sectionChild?.children)) {
            addNodeToChildren(sectionChild.children, node);
        }
    });

    return nodes;
}

function getNodeGroupBySectionSlug(nodesGroups: GroupFromQuery[], sectionSlug: string): GroupFromQuery | undefined {
    return nodesGroups.find((node) => node.fieldValue === sectionSlug);
}

interface CreateNavLinksArgs {
    nodesGroups: GroupFromQuery[];
    pageMap: PageMap[];
    parentNavLink?: NavLinkItem;
    navLinksResult?: NavLinkItem[];
}

// TODO: figure out better way to handle childSections
// - childSections are currently defined in pageMap, which is a static constant
function createNavLinks({ nodesGroups, pageMap }: CreateNavLinksArgs): NavLinkItem[] {
    const navLinksResult = [];

    for (const pageConfig of pageMap) {
        const navLink = {
            slug: pageConfig.sectionSlug,
            label: pageConfig.title,
            children: [] as NavLinkItem[],
        };

        const nodeGroup = getNodeGroupBySectionSlug(nodesGroups, pageConfig.sectionSlug);

        if (nodeGroup && nodeGroup.nodes) {
            const childSectionSlugs = pageConfig.childSections?.map((sectionConfig) => sectionConfig.sectionSlug);
            populateNavLinkChildren({
                children: navLink.children,
                childSectionSlugs: childSectionSlugs,
                nodes: nodeGroup.nodes,
            });
        }

        navLinksResult.push(navLink);
    }

    return navLinksResult;
}

export { createNavLinks };
