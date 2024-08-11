import { type PageMap } from 'common/constants/pageMap';

type BuildNodeOverrides = {
    directParent?: NodeFromQuery['fields']['directParent'];
    fullPath?: NodeFromQuery['frontmatter']['fullPath'];
    iconName?: NodeFromQuery['frontmatter']['iconComponentName'];
    label?: NodeFromQuery['frontmatter']['title'];
    pathComponents?: NodeFromQuery['fields']['pathComponents'];
    sectionSlug?: NodeFromQuery['frontmatter']['sectionSlug'];
    slug?: NodeFromQuery['fields']['slug'] | NodeFromQuery['slug'];
    topLevelParent?: NodeFromQuery['fields']['topLevelParent'];
};

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
     * @description Builds an instance of `Node` from a GraphQL query result node
     */
    buildNode({
        node,
        overrides = {},
    }: {
        node: NodeFromQuery;
        overrides?: BuildNodeOverrides;
    }): NavLinkNode {
        return new NavLinkNode({
            directParent:
                overrides?.directParent != null
                    ? overrides?.directParent
                    : node.fields.directParent,
            fullPath: overrides?.fullPath != null ? overrides?.fullPath : node.frontmatter.fullPath,
            iconName:
                overrides?.iconName != null
                    ? overrides?.iconName
                    : node.frontmatter.iconComponentName,
            label: overrides?.label != null ? overrides?.label : node.frontmatter.title,
            pathComponents:
                overrides?.pathComponents != null
                    ? overrides?.pathComponents
                    : node.fields.pathComponents,
            sectionSlug:
                overrides?.sectionSlug != null
                    ? overrides?.sectionSlug
                    : node.frontmatter.sectionSlug,
            slug: overrides?.slug != null ? overrides?.slug : node.fields.slug || node.slug,
            topLevelParent:
                overrides?.topLevelParent != null
                    ? overrides?.topLevelParent
                    : node.fields.topLevelParent,
        });
    }

    /**
     * @description Executes breadth-first search through child nodes.
     */
    findChildByPathComponent(pathComponent: string): NavLinkNode | null {
        const nodesQueue = [...this.children];

        while (nodesQueue.length > 0) {
            const currentNode = nodesQueue.shift() as NavLinkNode;

            if (
                currentNode.directParent === pathComponent ||
                currentNode.slug.indexOf(pathComponent) >= 0
            ) {
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
        if (childNode != null) {
            return childNode;
        }

        let directParentNode = this as NavLinkNode;
        const finalElementIndex =
            node.fields.pathComponents.length > 2
                ? node.fields.pathComponents.length - 1
                : node.fields.pathComponents.length;
        const childParentPathSteps = node.fields.pathComponents.slice(1, finalElementIndex);
        for (const pathComponent of childParentPathSteps) {
            childNode = this.findChildParentByPathComponent(pathComponent);

            if (childNode == null) {
                childNode = new NavLinkNode({
                    directParent: pathComponent,
                    topLevelParent: node.fields.topLevelParent,
                });
                directParentNode.children.push(childNode);
            }

            directParentNode = childNode;
        }

        return directParentNode;
    }

    addNodesToChildren({ nodes }: { nodes: NodeFromQuery[] }) {
        nodes.forEach((node: NodeFromQuery, i: number) => {
            const directParent = this.findOrCreateChildParent(node);
            const newChildNode = this.buildNode({ node });
            directParent.children.push(newChildNode);
        });
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

    console.log(JSON.parse(JSON.stringify({ nodesGroups })));
    for (const pageConfig of pageMap) {
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

function getNodeGroupBySectionSlug(
    nodesGroups: GroupFromQuery[],
    sectionSlug: string,
): GroupFromQuery | null {
    return nodesGroups.find((node) => node.fieldValue === sectionSlug) || null;
}

export { createNavLinks };
