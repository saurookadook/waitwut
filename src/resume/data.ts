export const headingDetails = {
    firstName: 'Andrew',
    lastName: 'Maskiell',
    contactInfo: {
        // phone: '585-410-5179',
        // email: 'maskiella@gmail.com',
        sites: [
            {
                type: 'GitHub',
                displayText: 'saurookadook',
                url: 'https://github.com/saurookadook',
            },
            // {
            //     type: 'Medium',
            //     displayText: 'Blog',
            //     url: 'https://medium.com/@andymaskiell',
            // },
            {
                type: 'LinkedIn',
                displayText: 'LinkedIn',
                url: 'https://www.linkedin.com/in/andrew-maskiell',
            },
        ],
    },
    introBlurb:
        "Full-stack web developer and software engineer possessing a background in music with a passion for composing code. My ability to work in a fast-paced environment, detail-oriented nature, and honed communication skills make me valuable in providing quality work. Besides that, I'm always good for a laugh.",
};

function buildLink({
    href, // <- to force formatting
    text,
}: {
    href: string;
    text: string;
}): string {
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
}

// TODO: separate these into categories?
const TechnicalSkills: string[] = [
    'JavaScript (ES5 and ES6)',
    'TypeScript',
    'Node.js',
    'Gatsby.js',
    'React',
    'Redux',
    'RegEx',
    'HTML',
    'CSS',
    'SASS',
    'Jest',
    'Express',
    'Java',
    'MongoDB',
    'Ruby',
    'Rails',
    'SQL',
    'PHP',
    'Twig',
    'CraftCMS',
    'Wordpress',
    'Docker',
];

const technologies = [
    {
        domain: 'Backend',
        Python: [
            'alembic',
            'arrow',
            'boto3',
            'click',
            'confluent-kafka',
            'fastapi',
            'launchdarkly-server-sdk',
            'newrelic',
            'requests',
            'snowflake-sqlalchemy',
            'sqlalchemy',
            'uvicorn',
            // DEV
            'black',
            'flake8',
            'mypy',
            'pytest',
            'pytest-watch',
            'requests-mock',
            'factory-boy',
            'pytest-sugar',
            'pytest-xdist',
            'Pygments',
            'rich',
        ],
    },
    {
        domain: 'Frontend',
        languagelibrariesMap: {
            'JavaScript/Node.js': [
                'ES5 and ES6',
                'TypeScript',
                'Express',
                'Jest',
                'Gatsby.js',
                'React',
                'Redux',
                'babel (7.21)',
                'classnames',
                'convict',
                'cookie',
                'dompurify',
                'express',
                'express-handlebars',
                'launchdarkly-js-client-sdk',
                'lodash-es',
                'newrelic',
                'react',
                'react-dom',
                'react-helmet',
                'react-router-dom',
                'styled-components',
                'validator',
                'winston',
                // DEV
                'eslint',
                'jest',
                'jsdom',
                'msw',
                'nodemon',
                'prettier',
                'storybook',
                'testing-library/dom',
                'testing-library/jest-dom',
                'testing-library/react',
                'testing-library/user-event',
                'webpack',
            ],
        },
    },
    {
        domain: 'Infrastructure', // TODO: more accurate name...?
    },
    {
        domain: 'Misc',
    },
];

const EmploymentHistory: EmploymentRecord[] = [
    {
        company: {
            name: 'Pluralsight',
            location: {
                city: 'Boston',
                state: 'MA',
            },
        },
        roles: [
            {
                title: 'Tech Lead',
                startDate: 'October 2023',
                endDate: 'Present',
            },
            {
                title: 'Software Engineer III',
                startDate: 'June 2022',
                endDate: 'Present',
            },
        ],
        responsibilities: [
            `Worked on the
            ${buildLink({
                href: 'https://www.pluralsight.com/product/skills-assessment',
                text: 'Skill IQ assessments product',
            })}`,
            `As tech lead, managed and contributed to development of the ${buildLink({
                href: 'https://app.pluralsight.com/skilliq/my-skills',
                text: 'My SKills tab',
            })}`,
            `Collaborated on feature development and maintenance of Python backend, utilizing packages such as
            ${buildLink({
                href: 'https://fastapi.tiangolo.com/',
                text: 'FastAPI',
            })},
            ${buildLink({
                href: 'https://www.uvicorn.org/',
                text: 'Uvicorn',
            })},
            ${buildLink({
                href: 'https://docs.pydantic.dev/latest/',
                text: 'Pydantic',
            })},
            ${buildLink({
                href: 'https://www.sqlalchemy.org/',
                text: 'SQLAlchemy',
            })}, ${buildLink({
                href: 'https://aws.amazon.com/sdk-for-python/',
                text: 'Boto3',
            })}`,
            `Actively wrote and improved backend tests using
            ${buildLink({
                href: 'https://docs.pytest.org/en/8.0.x/',
                text: 'pytest',
            })} and frontend tests using
            ${buildLink({
                href: 'https://jestjs.io/',
                text: 'Jest',
            })} and
            ${buildLink({
                href: 'https://testing-library.com/',
                text: 'Testing Library',
            })}`,
            `Helped maintain native Kafka producers and consumers using ${buildLink({
                href: 'https://docs.confluent.io/kafka-clients/python/current/overview.html',
                text: "Confluent's Kafka Python Client",
            })}`,
            `Led ${buildLink({
                href: 'https://www.pluralsight.com/tech-blog/frontend-migration-a-journey-through-time-and-space/',
                text: 'migration and refactoring of legacy frontend code',
            })} for Skill IQ experience`,
            `Drove early adoption of ${buildLink({
                href: 'https://github.com/pluralsight/pando',
                text: 'Pando design system library',
            })}`,
            `Created cron jobs to trigger alerts for issues in data integrity between ${buildLink({
                href: 'https://www.postgresql.org/',
                text: 'PostgreSQL',
            })} database tables and reflected tables in ${buildLink({
                href: 'https://www.snowflake.com/en/',
                text: 'Snowflake',
            })}`,
        ],
    },
    {
        company: {
            name: 'Salesforce',
            location: {
                city: 'Cambridge',
                state: 'MA',
            },
        },
        roles: [
            {
                title: 'MTS Software Engineer',
                startDate: 'November 2021',
                endDate: 'May 2022',
            },
            {
                title: 'AMTS Software Engineer',
                startDate: 'March 2020',
                endDate: 'October 2021',
            },
        ],
        responsibilities: [
            `Took ownership of the creation and documentation of the ${buildLink({
                href: 'https://developer.salesforce.com/docs/marketing/personalization/guide/flicker-defender.html',
                text: 'Flicker Defender gear',
            })}`,
            `Built several ${buildLink({
                href: 'https://github.com/evergage/evergage-global-templates',
                text: 'global templates',
            })} for the ${buildLink({
                href: 'https://developer.salesforce.com/docs/marketing/personalization/guide/campaign-development.html',
                text: 'new Campaign and Template system',
            })}`,
            `Contributed to Interaction Studio\'s ${buildLink({
                href: 'https://developer.salesforce.com/docs/marketing/personalization/guide/web-integration.html',
                text: 'Web SDK',
            })}, including tests in Jest`,
            'Implemented the redesign of UI screens using Angular 1.5 and KendoUI as part of the release for a major feature',
            `Deploy, review, and contribute code for Interaction Studio\'s ${buildLink({
                href: 'https://developer.salesforce.com/docs/marketing/personalization/guide/get-started.html',
                text: 'Developer Documentation',
            })} built with Gatsby.js`,
            'Led weekly office hours to facilitate quickly training support agents',
        ],
    },
    {
        company: {
            name: 'Evergage',
            location: {
                city: 'Somerville',
                state: 'MA',
            },
        },
        roles: [
            {
                title: 'Support Engineer',
                startDate: 'April 2019',
                endDate: 'February 2020',
            },
        ],
        responsibilities: [
            'Assist in supporting customer web and email integrations for an enterprise, real-time personalization platform',
            `Devise and create solutions for various types of web campaigns using ${buildLink({
                href: 'https://kangax.github.io/compat-table/es5/',
                text: 'ES5&nbsp;JS',
            })} to deliver personalized content to end-users`,
            `Write and fix sitemaps using ${buildLink({
                href: 'https://kangax.github.io/compat-table/es5/',
                text: 'ES5&nbsp;JS',
            })} which are integral to customer implementations`,
        ],
    },
    {
        company: {
            name: 'Upstatement',
            location: {
                city: 'Boston',
                state: 'MA',
            },
        },
        roles: [
            {
                title: 'Engineering Apprentice',
                startDate: 'August 2018',
                endDate: 'April 2019',
            },
        ],
        responsibilities: [
            `Contributed to ${buildLink({
                href: 'https://publicintegrity.org/',
                text: 'Center for Public Integrity',
            })}, ${buildLink({
                href: 'https://www.architects.org/',
                text: 'Boston Society for Architecture',
            })}, ${buildLink({
                href: 'https://upstatement.com/',
                text: 'upstatement.com',
            })}, and other internal projects`,
            'Configured complex web scraping robots to migrate thousands of articles and metadata during a content migration',
            'Extensive use of Regular Expressions to address a variety of issues in migration process',
            'Provided informed information architecture recommendations',
        ],
    },
    {
        company: {
            name: 'Boston Symphony Orchestra',
            location: {
                city: 'Boston',
                state: 'MA',
            },
        },
        roles: [
            {
                title: 'Stage Assistant (Symphony Hall and Tanglewood Music Center)',
                startDate: 'June 2014',
                endDate: 'July 2018',
            },
            {
                title: 'Assistant Stage Manager (Seiji Ozawa Hall, Tanglewood Music Center)',
                startDate: 'June 2017',
                endDate: 'September 2017',
            },
            {
                title: 'Personnel Manager (Tanglewood Music Center)',
                startDate: 'June 2016',
                endDate: 'August 2016',
            },
        ],
    },
];

const VolunteerWork: VolunteerRecord[] = [
    {
        organization: {
            name: 'Hack.Diversity',
            location: {
                city: 'Boston',
                state: 'MA',
            },
        },
        roles: [
            {
                title: 'Member of de.Hackathon Team',
                startDate: 'February 2020',
                endDate: 'Present',
            },
            {
                title: 'Mentor',
                startDate: 'January 2019',
                endDate: 'Present',
            },
        ],
    },
];

/**
 * TODO: get these dynamically using GitHub's GraphQL API
 * - https://stackoverflow.com/a/60123976
 * - https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
 *
 * Example query:
 * {
 *     user(login: "saurookadook") {
 *       pinnedItems(first: 6, types: REPOSITORY) {
 *         nodes {
 *           ... on Repository {
 *             name
 *             url
 *           }
 *         }
 *       }
 *     }
 * }
 *
 * Example curl request:
 * curl -L -X POST 'https://api.github.com/graphql' \
 * -H 'Authorization: bearer <token>' \
 * --data-raw '{"query":"{\n  user(login: \"GabrielBB\") {\n pinnedItems(first: 6, types: REPOSITORY) {\n nodes {\n ... on Repository {\n name\n }\n }\n }\n }\n}"
 * '
 */
const TechnicalProjects: TechnicalProjectRecord[] = [
    {
        displayName: 'EV3 Brick Program - Basically-A-Tank',
        links: [
            {
                type: 'github repository',
                url: 'https://github.com/saurookadook/ev3-basically-a-tank',
            },
        ],
        description:
            'Some kinda program for some kind of tank-like creation of mine with LEGO, the EV3Brick, and Python',
        startDate: 'February 2023',
        endDate: 'Present',
    },
    {
        displayName: 'waitwut',
        links: [
            {
                type: 'github repository',
                url: 'https://github.com/saurookadook/waitwut',
            },
        ],
        description:
            'A little Gatsby-fueled site with a bunch of programming cheatsheets, notes, and all other sorts of resources 🙃',
        startDate: 'July 2022',
        endDate: 'Present',
    },
    {
        displayName: 'Hack.Diversity React/Redux Template',
        links: [
            {
                type: 'github repository',
                url: 'https://github.com/Hack-Diversity/template-react-express-monorepo',
            },
        ],
        description: 'A simple CRUD app built using the MERN tech-stack',
        startDate: 'January 2020',
        endDate: 'Present',
    },
    {
        displayName: '8-bit Discourse (WIP)',
        links: [
            {
                type: 'github repository',
                url: 'https://github.com/saurookadook/eight-bit-discourse-app',
            },
        ],
        description: 'Forum for open discussion of video games',
        startDate: 'June 2018',
        endDate: 'Present',
    },
    {
        displayName: "Adopt Don't Shop",
        links: [
            {
                type: 'github repository',
                url: 'https://github.com/saurookadook/adopt-dont-shop-rails-js-app',
            },
        ],
        description: 'Web app for helping provide home for animals in adoption shelters',
        startDate: 'March 2018',
        endDate: 'July 2018',
    },
    {
        displayName: 'GameJournal',
        links: [
            {
                type: 'github repository',
                url: 'https://github.com/saurookadook/gamejournal-sinatra-app',
            },
        ],
        description: 'Web app that serves as place for users to document their library of games',
        startDate: 'February 2018',
        endDate: 'March 2018',
    },
];

const Education: EducationRecord[] = [
    {
        institution: 'Flatiron School',
        completionText: 'June 2018',
        certification: 'Full Stack Web Development, Ruby on Rails and JavaScript program',
    },
    {
        institution: 'Eastman School of Music ',
        location: {
            city: 'Rochester',
            state: 'NY',
        },
        completionText: 'Class of 2015',
        certification: 'BA in Viola Performance',
    },
];

// TODO: revisit this organization? Might be easier to just include sectionKey
// as part of each section item
export const sections: ResumeSection[] = [
    { TechnicalSkills: TechnicalSkills },
    { EmploymentHistory: EmploymentHistory },
    { VolunteerWork: VolunteerWork },
    { TechnicalProjects: TechnicalProjects },
    { Education: Education },
];
