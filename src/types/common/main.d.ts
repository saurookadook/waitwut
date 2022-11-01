/// <reference types="react-scripts" />

// export {}

interface CheatSheet {
    name: string;
    language: string;
    content: string;
}

interface AllCheatSheets {
    allCheatSheets: CheatSheet[];
}

interface NavLinkItem {
    slug?: string;
    label?: string;
    iconName?: string;
    children?: NavLinkItem[];
}

interface NodeFrontmatter {
    date?: Date;
    title: string;
    fullPath?: string;
    iconComponentName?: string;
}

interface NodeFromQuery {
    name: string;
    slug: string;
    frontmatter: NodeFrontmatter;
}

interface GroupFromQuery {
    nodes: NodeFromQuery[];
    fieldValue: TopLevelPageSlugs;
}

interface MdxNodes {
    group: GroupFromQuery[];
    nodes?: NodeFromQuery[];
}

interface MenuNavLinkArgs {
    depth: Integer;
    key?: string;
    navLink: NavLinkItem;
    parentPath?: string;
}

interface ListPageData {
    allMdx?: MdxNodes;
}

interface HeaderProps {
    data?: ListPageData;
}

/* ListPages */

interface ListPageProps {
    data: ListPageData;
}

interface BaseMdxFrontmatter {
    date?: Date;
    iconComponentName?: string;
    title: string;
}

interface BaseMdx {
    body: string;
    frontmatter: BaseMdxFrontmatter
}

interface BaseMdxData {
    mdx: BaseMdx;
}

interface BaseMdxProps {
    data: BaseData;
}

type IconComponents = {
    [key: string]: (() => React.ReactElement)
}

enum TopLevelPageSlugs {
    BOOKMARKS = "bookmarks",
    SHEETS = "sheets"
}
