import { type PageMap } from 'common/constants/pageMap';

/**
 * @notes
 * - IMPORTANT: `childSections` are currently defined in `pageMap`, which is a static constant
 * - I think I just need to implement something like a NavTree class because
 * this whole thing is a barrel of nonsense and sadness
 */
function createNavLinks({
    nodesGroups,
    pageMap,
}: {
    nodesGroups: GroupFromQuery[];
    pageMap: PageMap[];
}): NavLinkItem[] {
    const navLinksResult = [];

    for (const pageConfig of pageMap) {
        const navLink = {
            slug: pageConfig.sectionSlug,
            label: pageConfig.title,
            children: [] as NavLinkItem[],
        };

        const nodeGroup = getNodeGroupBySectionSlug(nodesGroups, pageConfig.sectionSlug);

        if (nodeGroup && nodeGroup.nodes) {
            const childSectionSlugs = buildChildSectionSlugs(pageConfig);
            populateNavLinkChildren({
                children: navLink.children,
                childSectionSlugs: childSectionSlugs || [],
                nodes: nodeGroup.nodes,
            });
        }

        navLinksResult.push(navLink);
    }

    return navLinksResult;
}

type NavChildSectionMap = {
    [key: string]: NavLinkItem | EmptyObject;
};

function populateNavLinkChildren({
    children,
    childSectionSlugs,
    nodes,
}: {
    children: NavLinkItem[];
    childSectionSlugs: string[];
    nodes: NodeFromQuery[];
}): NavLinkItem[] {
    const navChildSectionMap: NavChildSectionMap = {};
    let pathSteps;

    nodes.forEach((node: NodeFromQuery) => {
        const { pathComponents } = node.fields;

        pathSteps = pathComponents.slice(1, pathComponents.length - 1);

        const sectionChild = findOrCreateSectionChild({
            navChildSectionMap,
            pathSteps,
            childSectionSlugs,
        });

        if (sectionChild == null) {
            const trimmedSlug = buildTrimmedSlug({ node, pathComponents });
            if (navChildSectionMap[trimmedSlug]) {
                return addMissingFieldsToSection(navChildSectionMap[trimmedSlug], node);
            }

            return addNodeToChildren(children, node);
        }

        if (node.slug === sectionChild?.slug) {
            return addMissingFieldsToSection(sectionChild, node);
        }

        return addNodeToChildren(sectionChild.children as NavLinkItem[], node);
    });

    Object.values(navChildSectionMap).forEach((navChildSection) => {
        const targetChildNode = children.find(function (child) {
            return child.slug === navChildSection.slug;
        });

        if (!targetChildNode) {
            children && children.push(navChildSection as NavLinkItem);
            return;
        }

        if (navChildSection.children) {
            if (targetChildNode.children == null) {
                targetChildNode.children = [];
            }

            targetChildNode.children.push(navChildSection.children);
        }
    });

    return children;
}

function findOrCreateSectionChild({
    navChildSectionMap,
    pathSteps,
    childSectionSlugs,
    currentParent = {},
    sectionChild = {},
}: {
    navChildSectionMap: NavChildSectionMap | AmbiguousObject;
    pathSteps: string[];
    childSectionSlugs: string[];
    currentParent?: NavLinkItem | EmptyObject;
    sectionChild?: NavLinkItem | EmptyObject;
}): NavLinkItem | null {
    const pathStep = pathSteps.shift();
    if (!pathStep) {
        return null;
    }

    if (childSectionSlugs.includes(pathStep)) {
        if (!navChildSectionMap[pathStep]) {
            navChildSectionMap[pathStep] = {
                slug: `${pathStep}/`,
                children: [] as NavLinkItem[],
            };
        }

        currentParent = navChildSectionMap[pathStep] as NavLinkItem;
    }

    if (pathSteps.length >= 1 && !childSectionSlugs.includes(pathStep)) {
        childSectionSlugs.push(pathStep);
    }

    if (pathSteps.length > 0) {
        return findOrCreateSectionChild({
            navChildSectionMap,
            pathSteps: pathSteps,
            childSectionSlugs,
            currentParent,
            sectionChild,
        });
    }

    return currentParent;
}

function getNodeGroupBySectionSlug(nodesGroups: GroupFromQuery[], sectionSlug: string): GroupFromQuery | undefined {
    return nodesGroups.find((node) => node.fieldValue === sectionSlug);
}

function buildChildSectionSlugs(pageConfig: PageMap) {
    return pageConfig.childSections?.map((sectionConfig) => sectionConfig.sectionSlug);
}

function buildTrimmedSlug({
    node,
    pathComponents,
}: {
    node: NodeFromQuery;
    pathComponents: NodeFromQuery['fields']['pathComponents'];
}) {
    const slug = node.fields?.slug || node.slug;
    if (slug != null && slug !== '') {
        return slug.replace(/(^\/)|(\/$)/, '');
    }

    return `${pathComponents.slice(1).join('/')}/`;
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
        slug: node.fields?.slug || node.slug,
        label: node.frontmatter?.title || node.slug,
        iconName: node.frontmatter?.iconComponentName,
        fullPath: node.frontmatter?.fullPath,
    });
}

export { createNavLinks };
