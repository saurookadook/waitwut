export interface PageMap {
    color?: string;
    description?: string;
    sectionSlug: string;
    title: string;
    topParentSlug?: string;
    childSections?: PageMap[];
}

// TODO: this seems like a hack for basically just querying the top-level of `pages`...
const pageMap: PageMap[] = [ // TODO: better typing :)
    {
        color: '#E95800',
        description: 'Mix of notes and cheat sheets 🙂',
        sectionSlug: 'sheets',
        title: 'Sheets',
    },
    {
        color: '#E95800',
        description: 'My Library-of-Alexandria-sized collection of bookmarks. 🤓',
        sectionSlug: 'bookmarks',
        title: 'Bookmarks',
        childSections: [
            {
                color: '#E95800',
                description: 'TODO 🙃',
                sectionSlug: 'code',
                title: 'Code',
                topParentSlug: 'bookmarks'
            }
        ]
    },
];

export default pageMap;
