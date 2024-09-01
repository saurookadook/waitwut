const fs = require('fs');
const path = require('path');
const generateFileNameFromPageKey = require('../utils/index.js');

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

function generateMDXPageFromKey({ pageKey, pageMarkdown }) {
    const fileName = generateFileNameFromPageKey(pageKey);
    const filePath = `../docs/bookmarks/code/${fileName}.mdx`;
    return fs.writeFile(filePath, pageMarkdown, 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }

        console.log(`Creating page for '${fileName}'...`);
        return pageMarkdown;
    });

    // const tablePromises = tables.map(tableName => {
    //     return new Promise(function(resolve, reject) {

    //         // const recordsArg = JSON.stringify({ records }, null, 2);

    //         const filePath = `../docs/bookmarks/code/${tableName}.json`;
    //         fs.writeFile(filePath, recordsArg, 'utf8', function(err) {
    //             if (err) {
    //                 reject(err);
    //             }

    //             resolve(() => {
    //                 return JSON.parse(recordsArg);
    //             });
    //         });
    //     });
    // });

    // return Promise.all(tablePromises).then(() => context);
}

async function generatePages() {
    const allBookmarksData = await getAllBookmarksData().then((data) => JSON.parse(data));
    console.log({ allBookmarksData });
    if (!allBookmarksData || (allBookmarksData.allKeys || []).length <= 0) {
        throw new Error("ERROR encountered when getting 'allBookmarksData': ", allBookmarksData);
    }

    for (const key of allBookmarksData.allKeys) {
        if (allBookmarksData[key]) {
            generateMDXPageFromKey({ pageKey: key, pageMarkdown: allBookmarksData[key] });
        }
    }
}
