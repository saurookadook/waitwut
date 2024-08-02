import { type PageMap } from 'common/constants/pageMap';

class NavLinkNode {
    children: NavLinkNode[];
    directParent: string;
    fullPath: string;
    iconName: string;
    label: string;
    pathComponents: string[];
    sectionSlug: string;
    slug: string;
    topLevelParent: string;

    constructor({
        directParent,
        slug = '',
        topLevelParent = '',
        children = [],
        fullPath = '', // force formatting
        iconName = '',
        label = '',
        pathComponents = [],
        sectionSlug = '',
    }: {
        directParent: string;
        slug?: string;
        topLevelParent?: string;
        children?: NavLinkNode[];
        fullPath?: string;
        iconName?: string;
        label?: string;
        pathComponents?: string[];
        sectionSlug?: string;
    }) {
        this.directParent = directParent;
        this.slug = slug;
        this.topLevelParent = topLevelParent;
        this.children = children;
        this.fullPath = fullPath;
        this.iconName = iconName;
        this.label = label;
        this.pathComponents = pathComponents;
        this.sectionSlug = sectionSlug;
    }

    /**
     * @description Executes breadth-first search through child nodes.
     */
    findChildByPathComponent(pathComponent: string): NavLinkNode | null {
        const nodesQueue = [...this.children];

        while (nodesQueue.length > 0) {
            const currentNode = nodesQueue.shift() as NavLinkNode;

            if (currentNode.directParent === pathComponent || currentNode.slug.indexOf(pathComponent) >= 0) {
                return currentNode;
            }

            nodesQueue.push(...currentNode.children);
        }

        return null;
    }

    findChildParentByPathComponent(pathComponent: string): NavLinkNode | null {
        return this.slug === pathComponent || this.directParent === pathComponent
            ? this
            : this.findChildByPathComponent(pathComponent);
    }

    findChildSection(sectionSlug: string): NavLinkNode | null {
        const nodesQueue = [...this.children];

        while (nodesQueue.length > 0) {
            const currentNode = nodesQueue.shift() as NavLinkNode;

            if (currentNode.sectionSlug === sectionSlug) {
                return currentNode;
            }

            nodesQueue.push(...currentNode.children);
        }

        return null;
    }

    findOrCreateChildParent(node: NodeFromQuery): NavLinkNode {
        let childNode = this.findChildParentByPathComponent(node.fields.directParent);
        // console.log({
        //     callPoint: 1,
        //     method: 'findOrCreateChildParent',
        //     targetChildSlug: node.fields.directParent,
        //     childNode,
        //     node,
        //     nodes,
        // });
        // debugger;
        if (childNode != null) {
            return childNode;
        }

        let directParentNode = this as NavLinkNode;
        const finalElementIndex =
            node.fields.pathComponents.length > 2
                ? node.fields.pathComponents.length - 1
                : node.fields.pathComponents.length;
        const childParentPathSteps = node.fields.pathComponents.slice(1, finalElementIndex);
        console.log({
            method: 'findOrCreateChildParent',
            childParentPathSteps,
            targetChildSlug: node.fields.directParent,
        });
        for (const pathComponent of childParentPathSteps) {
            // console.log({
            //     callPoint: 2,
            //     method: 'findOrCreateChildParent',
            //     childNode,
            //     directParentNode,
            //     pathComponent,
            // });
            childNode =
                this.findChildParentByPathComponent(pathComponent) ||
                new NavLinkNode({
                    directParent: pathComponent,
                    topLevelParent: node.fields.topLevelParent,
                });
            // debugger;
            directParentNode.children.push(childNode);
            directParentNode = childNode;
            // console.log({
            //     callPoint: 3,
            //     method: 'findOrCreateChildParent',
            //     childNode,
            //     directParentNode,
            //     pathComponent,
            // });
            // debugger;
        }

        return directParentNode;
    }

    addNodesToChildren({ nodes }: { nodes: NodeFromQuery[] }) {
        nodes.forEach((node: NodeFromQuery, i: number) => {
            const directParent = this.findOrCreateChildParent(node);
            // debugger;
            const newChildNode = new NavLinkNode({
                directParent: node.fields.directParent,
                fullPath: node.frontmatter.fullPath,
                iconName: node.frontmatter.iconComponentName,
                label: node.frontmatter.title,
                pathComponents: node.fields.pathComponents,
                sectionSlug: node.frontmatter.sectionSlug,
                slug: node.fields.slug || node.slug,
                topLevelParent: node.fields.topLevelParent,
            });
            directParent.children.push(newChildNode);
            console.log({ index: i, directParent, newChildNode });
        });
        // debugger;
    }
}

function createNavLinks({
    nodesGroups,
    pageMap,
}: {
    nodesGroups: GroupFromQuery[];
    pageMap: PageMap[];
}): NavLinkItem[] {
    const navLinksResult = [];

    for (const pageConfig of pageMap) {
        // if (pageConfig.sectionSlug !== 'notes') {
        //     continue;
        // }

        const navLinkSectionNode = new NavLinkNode({
            directParent: '',
            fullPath: `/${pageConfig.sectionSlug}`,
            label: pageConfig.title,
            slug: pageConfig.sectionSlug,
            topLevelParent: pageConfig.sectionSlug,
        });

        const nodeGroup = getNodeGroupBySectionSlug(nodesGroups, pageConfig.sectionSlug);

        if (nodeGroup != null && nodeGroup.nodes) {
            navLinkSectionNode.addNodesToChildren({ nodes: nodeGroup.nodes });
        }

        navLinksResult.push(navLinkSectionNode);
    }

    return navLinksResult;
}

class NavLinkSectionTree {
    root: NavLinkNode;
    // children: NavLinkNode[];

    constructor({ root, children = [] }: { root: NavLinkNode; children?: NavLinkNode[] }) {
        this.root = root;
        // this.children = children;
    }

    populateRootChildren({
        // populateNavLinkChildren({
        childSectionSlugs,
        nodes,
        sectionSlug,
    }: {
        childSectionSlugs: string[];
        nodes: NodeFromQuery[];
        sectionSlug: string;
    }): void {
        const navChildSectionMap: NavChildSectionMap = {};
        let pathSteps;

        nodes.forEach((node: NodeFromQuery, i: number) => {
            const navLinkNode = new NavLinkNode({
                directParent: node.fields.directParent,
                fullPath: node.frontmatter.fullPath,
                label: node.frontmatter.title,
                pathComponents: node.fields.pathComponents,
                sectionSlug: sectionSlug,
                slug: node.fields.slug || node.slug,
                topLevelParent: node.fields.topLevelParent,
            });

            pathSteps = navLinkNode.pathComponents.slice(1, navLinkNode.pathComponents.length - 1);
            console.log(`before findOrCreateSectionChild call - ${i}`);
            console.log(
                JSON.parse(JSON.stringify({ node, navLinkNode, childSectionSlugs, navChildSectionMap, pathSteps })),
            );
            debugger;
            try {
                const sectionChild = navLinkNode.addNodesToChildren({ nodes });
                // findOrCreateSectionChild({
                //     sectionSlug,
                //     penultimatePathStep: navLinkNode.pathComponents[navLinkNode.pathComponents.length - 1],
                //     pathSteps,
                //     navChildSectionMap,
                //     childSectionSlugs,
                // });
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
        console.log(JSON.parse(JSON.stringify({ children: this.root.children, navChildSectionMap, nodes })));
        console.groupEnd();
    }
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
            directParent: node.fields.directParent,
            fullPath: node.frontmatter.fullPath,
            label: node.frontmatter.title,
            pathComponents: node.fields.pathComponents,
            sectionSlug: sectionSlug,
            slug: node.fields.slug || node.slug,
            topLevelParent: node.fields.topLevelParent,
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

function getNodeGroupBySectionSlug(nodesGroups: GroupFromQuery[], sectionSlug: string): GroupFromQuery | null {
    return nodesGroups.find((node) => node.fieldValue === sectionSlug) || null;
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
