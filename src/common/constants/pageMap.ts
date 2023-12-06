import { themeColors } from 'themes';

export interface PageMap {
    color?: string;
    description?: string;
    sectionSlug: string;
    title: string;
    topParentSlug?: string;
    childSections?: PageMap[];
}

// TODO: this seems like a hack for basically just querying the top-level of `pages`...
const pageMap: PageMap[] = [
    // TODO: better typing :)
    {
        color: themeColors.plBlue,
        description: 'Some cheat sheets and quick references 🙂',
        sectionSlug: 'sheets',
        title: 'Sheets',
    },
    {
        color: themeColors.plBlue,
        description: 'Buncha notes 🗒️',
        sectionSlug: 'notes',
        title: 'Notes',
        childSections: [
            {
                color: '#E95800',
                description: 'TODO 🙃',
                sectionSlug: 'python',
                title: 'Python',
                topParentSlug: 'notes',
            },
        ],
    },
    {
        color: themeColors.honeycombOrange,
        description: 'My Library-of-Alexandria-sized collection of bookmarks. 🤓',
        sectionSlug: 'bookmarks',
        title: 'Bookmarks',
        childSections: [
            {
                color: '#E95800',
                description: 'TODO 🙃',
                sectionSlug: 'code',
                title: 'Code',
                topParentSlug: 'bookmarks',
            },
        ],
    },
];

export default pageMap;
