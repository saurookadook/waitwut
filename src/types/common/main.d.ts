/// <reference types="react-scripts" />

// export {}
type AmbiguousObject = Record<string, unknown>;

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

interface MenuNavLinkProps {
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

enum TopLevelPageSlugs {
    BOOKMARKS = 'bookmarks',
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

type GenericStateSliceReducer = [StateSliceReducerFunc, StateSlice];

interface StateSliceReducers {
    [key: string]: GenericStateSliceReducer;
}

type CombinedStateSliceReducers = [GenericReducerFunc, CombinedState];

interface FinalReducers {
    [key: string]: GenericReducerFunc;
}
