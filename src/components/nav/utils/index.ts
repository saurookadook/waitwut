import { type PageMap } from 'common/constants/pageMap';

class NavLinkNode {
    children: NavLinkNode[];
    fullPath: string;
    iconName: string;
    label: string;
    pathComponents: string[];
    sectionSlug: string;
    slug: string;

    constructor({
        slug,
        children = [],
        fullPath = '', // force formatting
        iconName = '',
        label = '',
        pathComponents = [],
        sectionSlug = '',
    }: {
        slug: string;
        children?: NavLinkNode[];
        fullPath?: string;
        iconName?: string;
        label?: string;
        pathComponents?: string[];
        sectionSlug?: string;
    }) {
        this.slug = slug;
        this.children = children;
        this.fullPath = fullPath;
        this.iconName = iconName;
        this.label = label;
        this.pathComponents = pathComponents;
        this.sectionSlug = sectionSlug;
    }

    // breadthFirstSearchThroughChildren(node: NavLinkNode) {
    //     const nodesQueue = []
    // }

    /**
     * @description Executes breadth-first search through child nodes.
     */
    findChildBySlug(slug: string): NavLinkNode | null {
        const nodesQueue = [...this.children];

        while (nodesQueue.length > 0) {
            const currentNode = nodesQueue.shift() as NavLinkNode;

            if (currentNode.slug === slug) {
                return currentNode;
            }

            nodesQueue.push(...currentNode.children);
        }

        return null;
    }
}

// class LinkGroupNode {
//     constructor(node) {
//         this.sectionNode = node;
//         this.children = [];
//     }
// }

function createNavLinks({
    nodesGroups,
    pageMap,
}: {
    nodesGroups: GroupFromQuery[];
    pageMap: PageMap[];
}): NavLinkItem[] {
    const navLinksResult = [];

    for (const pageConfig of pageMap) {
        if (pageConfig.sectionSlug !== 'notes') {
            continue;
        }

        const navLinkNode = new NavLinkNode({
            fullPath: `/${pageConfig.sectionSlug}`,
            label: pageConfig.title,
            slug: pageConfig.sectionSlug,
        });

        const nodeGroup = getNodeGroupBySectionSlug(nodesGroups, pageConfig.sectionSlug);

        if (nodeGroup && nodeGroup.nodes) {
            const childSectionSlugs = buildChildSectionSlugs(pageConfig);
            populateNavLinkChildren({
                children: navLinkNode.children,
                childSectionSlugs: childSectionSlugs || [],
                nodes: nodeGroup.nodes,
                sectionSlug: pageConfig.sectionSlug,
            });
        }

        navLinksResult.push(navLinkNode);
    }

    return navLinksResult;
}

function populateNavLinkChildren({
    children,
    childSectionSlugs,
    nodes,
    sectionSlug,
}: {
    children: NavLinkItem[];
    childSectionSlugs: string[];
    nodes: NodeFromQuery[];
    sectionSlug: string;
}): NavLinkItem[] {
    const navChildSectionMap: NavChildSectionMap = {};
    let pathSteps;
    // let sectionChild;

    nodes.forEach((node: NodeFromQuery, i: number) => {
        const navLinkNode = new NavLinkNode({
            fullPath: node.frontmatter.fullPath,
            label: node.frontmatter.title,
            pathComponents: node.fields.pathComponents,
            sectionSlug: sectionSlug,
            slug: node.fields.slug || node.slug,
        });

        pathSteps = navLinkNode.pathComponents.slice(1, navLinkNode.pathComponents.length - 1);
        console.log(`before findOrCreateSectionChild call - ${i}`);
        console.log(
            JSON.parse(JSON.stringify({ node, navLinkNode, childSectionSlugs, navChildSectionMap, pathSteps })),
        );
        debugger;
        try {
            const sectionChild = findOrCreateSectionChild({
                childSectionSlugs,
                navChildSectionMap,
                pathSteps,
                penultimatePathStep: navLinkNode.pathComponents[navLinkNode.pathComponents.length - 1],
                sectionSlug,
            });
            console.log(`sectionChild - ${i}`);
            console.log(
                JSON.parse(
                    JSON.stringify({
                        node,
                        navLinkNode,
                        sectionChild,
                        childSectionSlugs,
                        navChildSectionMap,
                        pathSteps,
                    }),
                ),
            );
            // debugger;
        } catch (e) {
            console.groupCollapsed("ERROR in 'findOrCreateSectionChild'");
            console.error(e);
            console.error(JSON.parse(JSON.stringify({ childSectionSlugs, navChildSectionMap, pathSteps })));
            console.groupEnd();
            throw e;
        }
    });

    console.groupCollapsed('populateNavLinkChildren - before return');
    console.log(JSON.parse(JSON.stringify({ children, navChildSectionMap, nodes })));
    console.groupEnd();
    return children;
}

function findOrCreateSectionChild({
    childSectionSlugs,
    navChildSectionMap,
    pathSteps,
    penultimatePathStep,
    sectionSlug,
    currentParent = null,
    sectionChild = {},
}: {
    childSectionSlugs: string[];
    navChildSectionMap: NavChildSectionMap;
    pathSteps: string[];
    penultimatePathStep: string;
    sectionSlug: string;
    currentParent?: NavLinkItem | null;
    sectionChild?: NavLinkItem | EmptyObject;
}): NavLinkItem | null {
    const pathStep = pathSteps.shift();
    if (pathStep == null) {
        return null;
    }

    console.groupCollapsed();
    console.log({ childSectionSlugs, navChildSectionMap, pathSteps, sectionSlug, currentParent, sectionChild });
    console.groupEnd();
    debugger;
    // if (childSectionSlugs.includes(pathStep)) {
    //     if (!navChildSectionMap[pathStep]) {
    //         navChildSectionMap[pathStep] = new NavLinkNode({
    //             slug: pathStep,
    //             sectionSlug: sectionSlug,
    //         });
    //     }

    //     currentParent = navChildSectionMap[pathStep];
    // }

    // if (pathSteps.length && !childSectionSlugs.includes(pathStep)) {
    //     childSectionSlugs.push(pathStep);
    // }

    return currentParent;
}

/**
 * @notes
 * - IMPORTANT: `childSections` are currently defined in `pageMap`, which is a static constant
 * - I think I just need to implement something like a NavTree class because
 * this whole thing is a barrel of nonsense and sadness
 */
function _createNavLinks({
    nodesGroups,
    pageMap,
}: {
    nodesGroups: GroupFromQuery[];
    pageMap: PageMap[];
}): NavLinkItem[] {
    const navLinksResult = [];

    for (const pageConfig of pageMap) {
        const navLink = {
            fullPath: `/${pageConfig.sectionSlug}`,
            label: pageConfig.title,
            slug: pageConfig.sectionSlug,
            children: [] as NavLinkItem[],
        };

        const nodeGroup = getNodeGroupBySectionSlug(nodesGroups, pageConfig.sectionSlug);

        if (nodeGroup && nodeGroup.nodes) {
            const childSectionSlugs = buildChildSectionSlugs(pageConfig);
            _populateNavLinkChildren({
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
    [key: string]: NavLinkItem;
};

function _populateNavLinkChildren({
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

        const sectionChild = _findOrCreateSectionChild({
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

            targetChildNode.children.push(...navChildSection.children);
        }
    });

    return children;
}

function _findOrCreateSectionChild({
    navChildSectionMap,
    pathSteps,
    childSectionSlugs,
    currentParent = null,
    sectionChild = {},
}: {
    navChildSectionMap: NavChildSectionMap;
    pathSteps: string[];
    childSectionSlugs: string[];
    currentParent?: NavLinkItem | null;
    sectionChild?: NavLinkItem | EmptyObject;
}): NavLinkItem | null {
    const pathStep = pathSteps.shift();
    if (!pathStep) {
        return null;
    }

    if (childSectionSlugs.includes(pathStep)) {
        if (!navChildSectionMap[pathStep]) {
            // @ts-expect-error: TODO
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
        return _findOrCreateSectionChild({
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

export { createNavLinks, _createNavLinks };
