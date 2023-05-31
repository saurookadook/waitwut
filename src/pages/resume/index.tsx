import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled, { useTheme } from 'styled-components';

const employmentHistory = [
    {
        company: {
            name: 'Salesforce',
            location: {
                city: 'Cambridge',
                state: 'MA'
            },
        },
        roles: [
            {
                title: 'MTS Software Engineer',
                startDate: 'November 2021',
                endDate: 'Present'
            },
            {
                title: 'AMTS Software Engineer',
                startDate: 'March 2020',
                endDate: 'October 2021'
            }
        ],
        responsibilities: [
            'Took ownership of the creation and documentation of the Flicker Defender gear',
            'Built several global templates for the new Campaign and Template system',
            'Contributed to Interaction Studio’s Web SDK, including tests in Jest',
            'Implemented the redesign of UI screens using Angular 1.5 and KendoUI as part of the release for a major feature',
            'Deploy, review, and contribute code for Interaction Studio’s Developer Documentation built with Gatsby.js',
            'Led weekly office hours to facilitate quickly training support agents',
        ]
    },
    {
        company: {
            name: 'Evergage',
            location: {
                city: 'Somerville',
                state: 'MA'
            }
        },
        roles: [
            {
                title: 'Support Engineer',
                startDate: 'April 2019',
                endDate: 'February 2020'
            }
        ],
        responsibilities: [
            'Assist in supporting customer web and email integrations for an enterprise, real - time personalization platform',
            'Devise and create solutions for various types of web campaigns using ES5 JS to deliver personalized content to end - users',
            'Write and fix sitemaps using ES5 JS which are integral to customer implementations'
        ]
    },
    {
        company: {
            name: 'Upstatement',
            location: {
                city: 'Boston',
                state: 'MA'
            }
        },
        roles: [
            {
                title: 'Engineering Apprentice',
                startDate: 'August 2018',
                endDate: 'April 2019'
            }
        ],
        responsibilities: [
            'Contributed to Center for Public Integrity, Boston Society for Architecture, upstatement.com, and other internal projects',
            'Configured complex web scraping robots to migrate thousands of articles and metadata during a content migration',
            'Extensive use of Regular Expressions to address a variety of issues in migration process',
            'Provided informed information architecture recommendations',
        ]
    },
    {
        company: {
            name: 'Boston Symphony Orchestra',
            location: {
                city: 'Boston',
                state: 'MA'
            }
        },
        roles: [
            {
                title: 'Stage Assistant (Symphony Hall and Tanglewood Music Center)',
                startDate: 'June 2014',
                endDate: 'July 2018'
            }, {
                title: 'Assistant Stage Manager (Seiji Ozawa Hall, Tanglewood Music Center)',
                startDate: 'June 2017',
                endDate: 'September 2017'
            }, {
                title: 'Personnel Manager (Tanglewood Music Center)',
                startDate: 'June 2016',
                endDate: 'August 2016'
            }
        ]
    }
]

const Resume = (): React.ReactElement => {
    return (
        <main>
            <h1>Andy Maskiell</h1>
        </main>
    );
}

export default Resume;
