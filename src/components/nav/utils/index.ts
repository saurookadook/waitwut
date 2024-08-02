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

function getNodeGroupBySectionSlug(nodesGroups: GroupFromQuery[], sectionSlug: string): GroupFromQuery | null {
    return nodesGroups.find((node) => node.fieldValue === sectionSlug) || null;
}

export { createNavLinks };
