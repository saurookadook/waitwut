if (!window) {
    var window = {};
}

window._bookmarksDebugging = { flattenedBookmarks: [] };

const bookmarksTree = {
    startTime: null,
    endTime: null,
    totalNodes: 0,
    totalBookmarks: 0,
};

const topLevelFolders = querySelectorAllAsArray('body > dl > dt').filter((node) => {
    return ((node || {}).firstChild || {}).localName == 'h3';
});

const codingReferencesTopFolder = querySelectorAllAsArray('body > dl > dt > dl > dt').find(
    (node) => (node.firstChild || {}).textContent === 'Coding References',
);

const codingReferencesSubFolders = Array.from(codingReferencesTopFolder.childNodes).find(
    (node) => node.localName === 'dl',
);

Object.assign(window._bookmarksDebugging, {
    topLevelFolders,
    codingReferencesTopFolder,
    codingReferencesSubFolders,
});

function traverseFoldersAndAddToTree({ currentNode, depth, subFolders, treeNodeName }) {
    if (!currentNode[treeNodeName]) {
        currentNode[treeNodeName] = {
            depth: 0,
            key: treeNodeName,
            children: [],
            childSectionKeys: [],
        };
    }
    // console.log(`Traversing ${(subFolders || []).length} folders in ${treeNodeName}`);
    bookmarksTree.totalNodes += (subFolders || []).length;

    const newCurrentNode = currentNode[treeNodeName];
    // console.log(' --- new current node: ', newCurrentNode);

    for (const node of subFolders) {
        if (node.localName === 'p' && !/\w+/.test(node.textContent)) {
            continue;
        }

        if (/dl|dt/i.test(node.localName)) {
            if (node.firstChild?.localName === 'a') {
                newCurrentNode.children.push({
                    name: node.firstChild?.textContent,
                    link: node.firstChild?.getAttribute('href'),
                });
                bookmarksTree.totalBookmarks++;
                // window._bookmarksDebugging.flattenedBookmarks.push({
                //     name: node.firstChild?.textContent,
                //     link: node.firstChild?.getAttribute('href'),
                // });
                continue;
            } else if (node.firstChild?.localName === 'h3') {
                const subFolderKey = node.firstChild?.textContent;
                const subFolderParent = findSubFolderParent(node.childNodes);

                newCurrentNode.childSectionKeys.push(subFolderKey);

                traverseFoldersAndAddToTree({
                    currentNode: newCurrentNode,
                    depth: depth + 1,
                    subFolders: getSubFolders(subFolderParent.childNodes),
                    treeNodeName: subFolderKey,
                });
            }
        }
    }
}

bookmarksTree.startTime = Date.now();

traverseFoldersAndAddToTree({
    currentNode: bookmarksTree,
    depth: 0,
    subFolders: getSubFolders(codingReferencesSubFolders.childNodes),
    treeNodeName: 'Coding References',
});

bookmarksTree.endTime = Date.now();

console.log(
    '-------------------------------------------------------------------- DONE --------------------------------------------------------------------',
);
console.log('diagnostic: ');
console.log(` - startTime: ${bookmarksTree.startTime}`);
console.log(` - endTime: ${bookmarksTree.endTime}`);
console.log(`total elapsed: ${bookmarksTree.endTime - bookmarksTree.startTime}`);
console.log('result: ', { bookmarksTree });

Object.assign(window._bookmarksDebugging, { bookmarksTree });

/* Utils */

function querySelectorAllAsArray(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function findSubFolderParent(childNodes) {
    return Array.from(childNodes).find((node) => /dl|dt/i.test(node.localName));
}

function getSubFolders(childNodes) {
    return Array.from(childNodes).filter((node) => node.localName !== 'p');
}

/* Markdown Generator */

window._bookmarksDebugging.addMarkdownForSubFolder = function (subFolderKey) {
    const TARGET_KEY = `${subFolderKey}`;
    let markdownString = '';

    function generateMarkdownFromBookmarksSubFolder({ currentNode, subFolderKey, depth = 0 }) {
        let subFolder;
        if (depth <= 0) {
            subFolder = findSubFolderByKey({
                currentNode: currentNode,
                subFolderKey: subFolderKey,
            });
            if (!subFolder) {
                console.warn(`Couldn't find sub folder "${subFolderKey}" :'[`);
                return;
            }
        } else {
            subFolder = currentNode;
        }

        generateMarkdownForSection({
            key: subFolder.key,
            children: subFolder.children,
            depth: depth,
            shouldGenerateFrontmatter: depth === 0,
        });

        if ((subFolder.childSectionKeys || []).length > 0) {
            for (const childSectionKey of subFolder.childSectionKeys) {
                markdownString += '\n---\n\n';
                try {
                    generateMarkdownFromBookmarksSubFolder({
                        currentNode: subFolder[childSectionKey],
                        subFolderKey: childSectionKey,
                        depth: depth + 1,
                    });
                } catch (e) {
                    console.warn(
                        `WARNING: issue encountered while generating markdown for subFolder '${subFolderKey}'`,
                        e,
                    );
                }
            }
        }

        return markdownString;
    }

    function findSubFolderByKey({ currentNode, subFolderKey }) {
        console.log('Finding subFolder... ', { currentNode, subFolderKey });
        if (currentNode[subFolderKey]) {
            return currentNode[subFolderKey];
        }

        let result;
        const currentNodeKeys = Object.keys(currentNode).filter((nodeKey) => {
            return nodeKey !== 'key' && nodeKey !== 'children';
        });

        for (const nodeKey of currentNodeKeys) {
            console.log({ nodeKey, currentNode });
            result = findSubFolderByKey({
                currentNode: currentNode[nodeKey],
                subFolderKey: subFolderKey,
            });
            if (result) {
                break;
            }
        }

        return result;
    }

    function generateFrontmatter({ title }) {
        const frontmatterLines = [
            '---',
            `title: "${title}"`,
            'date: "2022-11-12"',
            `fullPath: "/bookmarks/code/${getFileNameFromPageKey(title)}"`,
            'sectionSlug: "code"',
            '---',
            '\n',
        ];

        return frontmatterLines.join('\n');
    }

    function generateMarkdownForSection({
        key,
        children,
        depth,
        shouldGenerateFrontmatter = false,
    }) {
        if (shouldGenerateFrontmatter) {
            markdownString += generateFrontmatter({ title: key });
        }
        console.log({ key, children, depth });
        const paddedLength = 2 + depth;

        markdownString +=
            '<details>\n' +
            '<summary>\n\n' +
            `${'##'.padEnd(paddedLength, '#')} ${key}\n\n` +
            '</summary>\n\n' +
            '<p>\n\n' +
            `${children.reduce((acc, cur) => {
                return acc + `- [${cur.name}](${cur.link})\n`;
            }, '')}\n` +
            '</p>\n' +
            '</details>\n';

        return markdownString;
    }

    function getFileNameFromPageKey(pageKey) {
        return pageKey.replace(
            /([A-Z]+)|(\s+|\.|')|(\/)/gm,
            function (match, p1, p2, p3, offset, string) {
                console.log({ match, p1, p2, offset, string });
                if (p1) {
                    return p1.toLowerCase();
                } else if (p2) {
                    return '-';
                } else if (p3) {
                    return '_';
                }
                return match;
            },
        );
    }

    const { bookmarksTree } = window._bookmarksDebugging;
    let subFolderMarkdown = '';
    try {
        subFolderMarkdown = generateMarkdownFromBookmarksSubFolder({
            subFolderKey: TARGET_KEY,
            currentNode: bookmarksTree['Coding References'],
        });
    } catch (e) {
        console.error('ERROR: encountered issue while generating markdown: ', e);
    }

    Object.assign(window._bookmarksDebugging, { [subFolderKey]: subFolderMarkdown });
};

window.newPages = [
    'Notes and Things',
    'HTML/CSS',
    'Misc.',
    'SFTP Clients',
    'Mac Tools',
    'Astrological Sites',
    'JavaScript',
    'Rails Tools/Articles',
    'Coding Exercises/Useful Articles',
    "Adopt Don't Shop seed images",
    'Code For Boston',
    'Emoji Chess stuff',
    '8-Bit Discourse stuff',
    'Portfolio Projects',
    "Ye Ol' Job Search",
    'Ruby',
    'Jekyll',
    "Other People's Notable Projects",
    'Node.js/nvm/npm',
    'Articles',
    'CPI Articles',
    'MAHacks Workshop',
    'Hosting',
    'Craft CMS',
    'Freelance Projects',
    'R',
    'Hack.Diversity',
    'matchminer',
    'Python',
    'MongoDB',
    'Java',
    'IDEs',
    'Arduino',
    'GraphQL',
    'Electron',
    'Memory-safe languages',
];

window.allMarkdown = {};

window.generateMarkdown = function () {
    for (const pageKey of window.newPages) {
        try {
            window._bookmarksDebugging.addMarkdownForSubFolder(pageKey);
            window.allMarkdown[pageKey] = window._bookmarksDebugging[pageKey];
        } catch (e) {
            console.error(`ERROR encountered for '${pageKey}': `, e);
        }
    }
    console.log(
        '-------------------------------------------------------------------- DONE --------------------------------------------------------------------',
    );
    console.log({
        allMarkdown: window.allMarkdown,
        _bookmarksDebugging: window._bookmarksDebugging,
    });
};

// module.exports = {
//     window
// };
