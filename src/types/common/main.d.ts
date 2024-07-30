/// <reference types="react-scripts" />

// export {}
type EmptyObject = Record<string, unknown>;
type AmbiguousObject = Record<string, unknown> | EmptyObject;
type DynamicObject<T> = Record<string, T>;

interface CheatSheet {
    name: string;
    language: string;
    content: string;
}

interface AllCheatSheets {
    allCheatSheets: CheatSheet[];
}

interface NavLinkItem {
    fullPath: string;
    label: string;
    slug: string;
    children?: NavLinkItem[];
    iconName?: string;
    pathComponents?: string[];
}

interface NodeFrontmatter {
    fullPath: string;
    sectionSlug: string;
    title: string;
    date?: Date;
    iconComponentName?: string;
}

interface NodeFields {
    directParent: string;
    pathComponents: string[];
    slug?: string;
    topLevelParent: string;
}

interface NodeFromQuery {
    name: string;
    slug: string;
    frontmatter: NodeFrontmatter;
    fields: NodeFields;
    path: string;
}

interface GroupFromQuery {
    nodes: NodeFromQuery[];
    fieldValue: TopLevelPageSlugs;
}

interface MdxNodes {
    group: GroupFromQuery[];
    nodes: NodeFromQuery[];
}

interface SideMenuData {
    allMdx: MdxNodes;
    allMarkdownRemark: MdxNodes;
}

interface ListPageData {
    allMdx: MdxNodes;
    allMarkdownRemark: MdxNodes;
}

/* ListPages */
interface BaseMdxFrontmatter {
    date?: Date;
    iconComponentName?: string;
    title: string;
}

interface BaseMdx {
    body: string;
    frontmatter: BaseMdxFrontmatter;
}

interface BaseMdxData {
    mdx: BaseMdx;
}

interface BaseMdxProps {
    data: BaseData;
}

type IconComponent = (props: (React.ComponentPropsWithoutRef & Record<any, any>)?) => React.ReactElement;

type IconComponents = {
    [key: string]: IconComponent;
};

// TODO: is this even necessary?
enum TopLevelPageSlugs {
    BOOKMARKS = 'bookmarks',
    NOTES = 'notes',
    SHEETS = 'sheets',
}

/* Resume */

interface SectionComponentProps {
    heading: string;
    data: Array<any>;
}

interface ResumeSection {
    [key: string]: string[] | EmploymentRecord[] | VolunteerRecord[] | TechnicalProjectRecord[] | EducationRecord[];
}

interface Site {
    [key: string]: string;
}

interface ContactInfo {
    phone?: string;
    email?: string;
    sites: Site[];
}

interface HeadingData {
    firstName: string;
    lastName: string;
    contactInfo: ContactInfo;
    introBlurb: string;
}

interface GeoLocation {
    city: string;
    state: string;
}

interface Role {
    title: string;
    startDate: string;
    endDate: string;
}

interface Company {
    name: string;
    location: GeoLocation;
}

interface EmploymentRecord {
    company: Company;
    roles: Role[];
    responsibilities?: string[];
}

interface VolunteerRecord {
    organization: Company;
    roles: Role[];
}

interface ProjectLink {
    type: string;
    url: string;
}

interface TechnicalProjectRecord {
    displayName: string;
    links: ProjectLink[];
    description: string;
    startDate: string;
    endDate: string;
}

interface EducationRecord {
    institution: string;
    location?: GeoLocation;
    completionText: string;
    certification: string;
}

/* Components */
interface StyleOverrides {
    [key: string]: string | number;
}

interface GenericStyledProps {
    readonly overrides?: StyleOverrides;
}

/* Store */
interface MenuStateSlice {
    drawerVisible: boolean;
}

type StateSlice = {
    [key: string]: MenuStateSlice | AmbiguousObject;
};

interface CombinedState extends StateSlice {
    menu?: MenuStateSlice;
}

interface BaseReducerAction {
    type: string;
    payload?: MenuStateSlice;
}

type GenericReducerFunc<S, A> = (state: S, action: A) => S;

type StateSliceReducerFunc = (state: StateSlice, action: BaseReducerAction) => StateSlice;

type GenericStateSliceReducer<S, A> = [GenericReducerFunc<S, A>, S];

interface StateSliceReducer {
    [key: string]: GenericStateSliceReducer;
}

type CombinedStateSliceReducer = [GenericReducerFunc, CombinedState];

interface FinalReducers {
    [key: string]: GenericReducerFunc;
}
