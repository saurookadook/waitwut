const fs = require('fs');
const path = require('path');
const generateFileNameFromPageKey = require('../utils/index.js');

// const __dirname = path.resolve();

function getAllBookmarksData() {
    return new Promise((resolve, reject) => {
        fs.readFile('./allBookmarkPageData.json', 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            }

            console.log('data: ', { data });
            resolve(data);
        });
    });
}

function generateMDPageFromKey({ pageKey, pageMarkdown }) {
    const fileName = generateFileNameFromPageKey(pageKey);
    const filePath = `../docs/bookmarks/code/${fileName}.md`;
    return fs.writeFile(filePath, pageMarkdown, 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }

        console.log(`Creating page for '${fileName}'...`);
        return pageMarkdown;
    });
}

async function generatePages() {
    const allBookmarksData = await getAllBookmarksData().then((data) => JSON.parse(data));
    console.log({ allBookmarksData });
    if (!allBookmarksData || (allBookmarksData.allKeys || []).length <= 0) {
        throw new Error("ERROR encountered when getting 'allBookmarksData': ", allBookmarksData);
    }

    for (const key of allBookmarksData.allKeys) {
        if (allBookmarksData[key]) {
            generateMDPageFromKey({ pageKey: key, pageMarkdown: allBookmarksData[key] });
        }
    }
}

generatePages();
