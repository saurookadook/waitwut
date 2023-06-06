import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled, { useTheme } from 'styled-components';
import { HeadingDetails } from '../../components/resume';
import { AbstractSection } from '../../components/resume/sections';
import { toTitleCase } from '../../utils';
import { resumeTheme } from '../../themes';

const headingDetails = {
    firstName: 'Andrew',
    lastName: 'Maskiell',
    contactInfo: {
        phone: '585-410-5179',
        email: 'maskiella@gmail.com',
        sites: [
            {
                type: 'GitHub',
                displayText: 'saurookadook',
                url: 'https://github.com/saurookadook',
            },
            {
                type: 'Medium',
                displayText: 'Blog',
                url: 'https://medium.com/@andymaskiell',
            },
            {
                type: 'LinkedIn',
                displayText: 'LinkedIn',
                url: 'https://www.linkedin.com/in/andrew-maskiell',
            },
        ],
    },
    introBlurb:
        'Full-stack web developer and software engineer possessing a background in music with a passion for composing code. My ability to work in a fast-paced environment, detail-oriented nature, and honed communication skills make me valuable in providing quality work. Besides that, I’m always good for a laugh.',
};

const TechnicalSkills = [
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

const EmploymentHistory = [
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
                title: 'Software Engineer III',
                startDate: 'June 2022',
                endDate: 'Present',
            },
        ],
        responsibilities: ['BUNCHA STUFF'],
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
            'Took ownership of the creation and documentation of the Flicker Defender gear',
            'Built several global templates for the new Campaign and Template system',
            'Contributed to Interaction Studio’s Web SDK, including tests in Jest',
            'Implemented the redesign of UI screens using Angular 1.5 and KendoUI as part of the release for a major feature',
            'Deploy, review, and contribute code for Interaction Studio’s Developer Documentation built with Gatsby.js',
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
            'Assist in supporting customer web and email integrations for an enterprise, real - time personalization platform',
            'Devise and create solutions for various types of web campaigns using ES5 JS to deliver personalized content to end - users',
            'Write and fix sitemaps using ES5 JS which are integral to customer implementations',
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
            'Contributed to Center for Public Integrity, Boston Society for Architecture, upstatement.com, and other internal projects',
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

const VolunteerWork = [
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

const TechnicalProjects = [
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
        displayName: 'Adopt Don’t Shop',
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

const Education = [
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

const sections: Record<string, (string | Record<string, unknown>)[]>[] = [
    { TechnicalSkills: TechnicalSkills },
    { EmploymentHistory: EmploymentHistory },
    { VolunteerWork: VolunteerWork },
    { TechnicalProjects: TechnicalProjects },
    { Education: Education },
];

const StyledMain = styled.main`
    display: flex;
    flex-direction: column;
    font-family: 'Arial Black', Arial, Helvetica, sans-serif;
    justify-content: flex-start;

    & h1 {
        font-size: 4rem;
    }

    & p {
        font-size: 1.5rem;
    }
`;

const Resume = (): React.ReactElement => {
    return (
        <StyledMain>
            <HeadingDetails headingData={headingDetails} />
            {sections.map((section, i): React.ReactElement => {
                const key = Object.keys(section)[0];
                if (['TechnicalSkills', 'EmploymentHistory'].includes(key)) {
                    return <AbstractSection key={`${key}-${i}`} sectionKey={key} sectionData={section[key]} />;
                }

                return (
                    <section key={`${key}-${i}`}>
                        <h3>{toTitleCase(key)}</h3>
                        <ul>
                            {section[key].map((record, j) => {
                                return (
                                    <li key={`${i}-${j}`}>
                                        {typeof record === 'string' ? (
                                            record
                                        ) : (
                                            <pre>{JSON.stringify(record, null, 4)}</pre>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </StyledMain>
    );
};

export default Resume;