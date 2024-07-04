import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

import { compile } from '@mdx-js/mdx';
import { createFilePath } from 'gatsby-source-filesystem';

// import BookmarksListPage from './src/pages/bookmarks/index';
// import BookmarkPage from './src/pages/bookmarks/{mdx.fields__slug.tsx}.tsx';
// import NotesListPage from './src/pages/notes/index';
// import NotePage from './src/pages/notes/{mdx.fields__slug.tsx}.tsx';
// import SheetsPage from './src/pages/sheets/index';
// import DocSheet from './src/pages/sheets/{mdx.fields__slug.tsx}.tsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// const bookmarkPageTemplate = require.resolve(`./src/pages/bookmarks/single-page.tsx`);
// const notePageTemplate = require.resolve(`./src/pages/notes/single-page.tsx`);
// const sheetPageTemplate = require.resolve(`./src/pages/sheets/single-page.tsx`);
// const bookmarkPageTemplate = path.resolve(__dirname, `src/pages/bookmarks/{mdx.fields__slug}.tsx`);
// const bookmarksListPageTemplate = path.resolve(__dirname, `src/pages/bookmarks/index.tsx`);
// const notePageTemplate = path.resolve(__dirname, `src/pages/notes/{mdx.fields__slug}.tsx`);
// const notesListPageTemplate = path.resolve(__dirname, `src/pages/notes/index.tsx`);
// const sheetPageTemplate = path.resolve(__dirname, `src/pages/sheets/{mdx.fields__slug}.tsx`);
// const sheetsListPageTemplate = path.resolve(__dirname, `src/pages/sheets/index.tsx`);

// export const createSchemaCustomization = ({ actions }) => {
//     const { createTypes } = actions;

//     const typeDefs = `

//     `;
// }

export const onCreateNode = ({ actions, getNode, node, reporter }) => {
    const { createNodeField } = actions;

    // reporter.info(`internalType: ${node.internal?.type}`);

    if (node?.frontmatter?.fullPath) {
        createNodeField({
            node,
            name: 'pathComponents',
            value: node.frontmatter.fullPath.match(/[^/]+(?=\/|$)/gim),
        });
    }

    if (node.internal?.type === 'Mdx') {
        const filePath = createFilePath({ node, getNode });
        // reporter.info(`    MDX file path: ${filePath}    `.padStart(120, '=').padEnd(240, '='));
        createNodeField({
            node,
            name: 'slug',
            value: filePath,
        });
    }
};

// export const createPages = async ({ actions, graphql, reporter }) => {
//     const { createPage, createRedirect } = actions;
//     let queryResult;

//     try {
//         queryResult = await graphql(`
//             query {
//                 allMdx {
//                     nodes {
//                         id
//                         body
//                         fields {
//                             slug
//                         }
//                         frontmatter {
//                             fullPath
//                         }
//                         internal {
//                             contentFilePath
//                             type
//                         }
//                     }
//                 }
//             }
//         `);
//     } catch (e) {
//         reporter.panic('ERROR with graphql query', e);
//     }

//     if (typeof queryResult == null) {
//         reporter.warn(`Error encountered with GraphQL query; skipping 'createPage' calls for allMdx.nodes...`);
//     }

//     if (queryResult.errors) {
//         reporter.panicOnBuild('Error loading MDX result', queryResult.errors);
//     }

//     try {
//         const {
//             data: { allMdx },
//         } = queryResult;

//         async function getTemplateComponentByFullPath(fullPath) {
//             if (fullPath.indexOf('/bookmarks') === 0) {
//                 return /^\/bookmarks(\/)?/gim.test(fullPath) ? BookmarksListPage : BookmarkPage;
//                 // ? path.resolve(__dirname, `src/pages/bookmarks/index.tsx`)
//                 // : path.resolve(__dirname, `src/pages/bookmarks/{mdx.fields__slug}.tsx`);
//                 // ? bookmarksListPageTemplate
//                 // : bookmarksPageTemplate;
//             } else if (fullPath.indexOf('/notes') === 0) {
//                 return /^\/notes(\/)?/gim.test(fullPath) ? NotesListPage : NotePage;
//                 // ? path.resolve(__dirname, `src/pages/notes/index.tsx`)
//                 // : path.resolve(__dirname, `src/pages/notes/{mdx.fields__slug}.tsx`);
//                 // ? notesListPageTemplate
//                 // : notesPageTemplate;
//             } else if (fullPath.indexOf('/sheets') === 0) {
//                 return /^\/sheets(\/)?/gim.test(fullPath) ? SheetsPage : DocSheet;
//                 // ? path.resolve(__dirname, `src/pages/sheets/index.tsx`)
//                 // : path.resolve(__dirname, `src/pages/sheets/{mdx.fields__slug}.tsx`);
//                 // ? sheetsListPageTemplate
//                 // : sheetsPageTemplate;
//             } else {
//                 reporter.panicOnBuild(`getTemplateComponentByFullPath: No templateComponent found for slug: ${slug}`);
//             }
//         }

//         allMdx.nodes.forEach(async (node) => {
//             const { id, body, fields, frontmatter, internal } = node;
//             const templateComponent = await getTemplateComponentByFullPath(frontmatter.fullPath);

//             const compiledMdxContent = await compile(body, {
//                 outputFormat: 'function-body',
//             });

//             console.log({
//                 node,
//                 templateComponent,
//                 // compiledMdxContent
//             });
//             try {
//                 createPage({
//                     path: fields.slug,
//                     component:
//                         templateComponent && internal.type === 'Mdx' ? templateComponent : internal.contentFilePath,
//                     // component:
//                     //     templateComponent && internal.type === 'Mdx'
//                     //         ? `${templateComponent}?__contentFilePath=${internal.contentFilePath}`
//                     //         : internal.contentFilePath,
//                     context: {
//                         id: id,
//                         compiledMdxContent: String(compiledMdxContent),
//                     },
//                 });
//             } catch (e) {
//                 const errorMessage = `ERROR with createPage - internalType: ${internal.type} || contentFilePath: ${internal.contentFilePath}`;
//                 console.error(errorMessage);
//                 console.error(e);
//                 reporter.panicOnBuild(errorMessage, e);
//             }
//         });
//     } catch (e) {
//         reporter.panicOnBuild('ERROR creating pages for nodes', e);
//     }
// };

export const onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                common: path.resolve(__dirname, 'src/common'),
                components: path.resolve(__dirname, 'src/components'),
                constants: path.resolve(__dirname, 'src/constants'),
                images: path.resolve(__dirname, 'src/images'),
                pages: path.resolve(__dirname, 'src/pages'),
                resume: path.resolve(__dirname, 'src/resume'),
                store: path.resolve(__dirname, 'src/store'),
                styles: path.resolve(__dirname, 'src/styles'),
                themes: path.resolve(__dirname, 'src/themes'),
                utils: path.resolve(__dirname, 'src/utils'),
            },
            extensions: [
                '.ts',
                '.tsx',
                '.mdx',
                '.md',
            ],
            // fallback: {
            //     fs: false,
            // },
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
    });
};
