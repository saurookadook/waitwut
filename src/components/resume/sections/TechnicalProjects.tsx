import React, { useState } from 'react';
import styled from 'styled-components';

import { GenericContainer, GenericHeading, GenericGridContainer } from '../components';
import { themeColors } from '../../../themes';

const ProjectItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    margin: 0.5rem 0;
    z-index: 1;

    &.collapsed {
        flex: 0;
        max-height: min-content;
        transition: all 300ms ease-out;
    }

    &.expanded {
        flex: 1;
        max-height: 100%;
        transition: all 300ms ease-in;
    }
`;

const ProjectDisplayName = styled.h3`
    margin-bottom: 0;

    &:hover {
        cursor: pointer;
    }
`;

const ProjectDetails = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    z-index: 0;

    &.hidden,
    &.hidden * {
        color: transparent;
        flex: 0;
        height: 0;
        max-height: 0;
        opacity: 0;
    }

    &.visible,
    &.visible * {
        flex: 1;
        height: auto;
        max-height: 100%;
        opacity: 1;
    }
`;

const ProjectLink = styled.a`
    color: ${themeColors.darkerPurpleHex};
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin-bottom: 0.25rem;

    &:hover {
        text-decoration: underline;
    }
`;

const SubText = styled.p`
    font-size: 1rem;
    line-height: 1.5rem;
`;

interface TechnicalProjectItemProps {
    technicalProjectRecord: TechnicalProjectRecord;
}

const TechnicalProjectItem = ({ technicalProjectRecord }: TechnicalProjectItemProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { description, displayName, endDate, links, startDate } = technicalProjectRecord;
    return (
        <ProjectItemContainer className={`${isCollapsed ? 'collapsed' : 'expanded'}`}>
            <ProjectDisplayName onClick={() => setIsCollapsed(!isCollapsed)}>{displayName}</ProjectDisplayName>
            <ProjectDetails className={`${isCollapsed ? 'hidden' : 'visible'}`}>
                {links.map((link, i) => (
                    <ProjectLink key={`project-link-${i}`} href={link.url} target="_blank" rel="noreferrer">
                        {link.url.replace('https://', '')}
                    </ProjectLink>
                ))}
                <SubText>
                    <i>{description}</i>
                </SubText>
                <SubText>
                    <i>
                        {startDate} - {endDate}
                    </i>
                </SubText>
            </ProjectDetails>
        </ProjectItemContainer>
    );
};

const TechnicalProjects = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    const RequestHeaders = new Headers({
        Accept: 'text/plain',
        'Access-Control-Allow-Origin': 'https://github.com',
        'Access-Control-Request-Method': 'GET',
        // 'Content-Type': 'text/html',
        Origin: window.location.hostname,
    });
    const pinnedRepos = fetch('https://github.com/saurookadook', {
        method: 'GET',
        headers: RequestHeaders,
        // mode: 'no-cors',
    })
        .then((resp) => resp.text())
        .then((textResp) => {
            console.log(textResp);
        })
        .catch((e) => {
            console.error('--------------------------------- YA DUN FUCKED IT ---------------------------------\n', e);
        });

    return (
        <GenericContainer
            overrides={{
                // <- to force
                backgroundColor: themeColors.stringGreen,
                color: themeColors.blackHex,
                padding: '2em 10vw',
            }}
        >
            <GenericHeading overrides={{ padding: '0' }}>{heading}</GenericHeading>
            <GenericGridContainer>
                {data.map((record, i) => {
                    return <TechnicalProjectItem key={`technical-project-${i}`} technicalProjectRecord={record} />;
                })}
            </GenericGridContainer>
        </GenericContainer>
    );
};

export default TechnicalProjects;
