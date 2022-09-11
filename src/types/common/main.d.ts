/// <reference types="react-scripts" />

// export {}

interface CheatSheet {
    name: string,
    language: string,
    content: string
}

interface AllCheatSheets {
    allCheatSheets: CheatSheet[]
}

interface NavLinkItem {
    slug?: string,
    label?: string,
    children?: NavLinkItem[]
}

interface NodeFrontmatter {
    date?: Date;
    title: string;
}

interface NodeFromQuery {
    name: string;
    slug: string;
    frontmatter: NodeFrontmatter;
}

interface MdxNodes {
    nodes?: NodeFromQuery[];
}

interface _MenuNavLinkArgs {
    navLink: NavLinkItem,
    index: Number
}

interface SheetPageData {
    allMdx?: MdxNodes;
}

interface HeaderProps {
    data?: SheetPageData;
}

/* SheetPage */

interface SheetPageProps {
    data: SheetPageData;
}

/* DocSheet */
interface DocSheetMdxFrontmatter {
    title: string;
    date: Date;
}

interface DocSheetMdx {
    body: string;
    frontmatter: DocSheetMdxFrontmatter
}

interface DocSheetData {
    mdx: DocSheetMdx
}

interface DocSheetProps {
    data: DocSheetData;
}
