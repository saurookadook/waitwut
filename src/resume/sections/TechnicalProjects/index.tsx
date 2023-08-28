import React, { MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    GenericContainer, // <- to force formatting
    GenericHeading,
    GenericGridContainer,
    ToggleIcon,
} from 'resume/components';
import GitHubOctocat from 'resume/icons/github';
import { themeColors } from 'themes/index';
import { collapsedOrExpanded } from 'utils/index';
import {
    ProjectItemContainer, // <- to force formatting
    ProjectNameWrapper,
    ProjectDisplayName,
    ProjectDetails,
    ProjectLink,
    ProjectLinkText,
    SubText,
} from './styled';

interface TechnicalProjectItemProps {
    technicalProjectRecord: TechnicalProjectRecord;
}

const TechnicalProjectItem = ({ technicalProjectRecord }: TechnicalProjectItemProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const handleToggleOnClick = (): void => setIsCollapsed(!isCollapsed);

    const { description, displayName, endDate, links, startDate } = technicalProjectRecord;

    return (
        <ProjectItemContainer className={collapsedOrExpanded(isCollapsed)}>
            <ProjectNameWrapper>
                <ToggleIcon onClick={handleToggleOnClick as MouseEventHandler}>
                    {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                </ToggleIcon>
                <ProjectDisplayName onClick={handleToggleOnClick as MouseEventHandler}>
                    {displayName}
                </ProjectDisplayName>
            </ProjectNameWrapper>
            <ProjectDetails className={'togglable list-item'}>
                {links.map((link, i) => (
                    <ProjectLink key={`project-link-${i}`} href={link.url} target="_blank" rel="noreferrer">
                        {link.type === 'github repository' && <GitHubOctocat />}
                        <ProjectLinkText>{link.url.replace('https://', '')}</ProjectLinkText>
                    </ProjectLink>
                ))}
                <SubText>
                    {/* <i> */}
                    {description}
                    {/* </i> */}
                </SubText>
                <SubText>
                    <i>
                        ({startDate} - {endDate})
                    </i>
                </SubText>
            </ProjectDetails>
        </ProjectItemContainer>
    );
};

const ProjectsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TechnicalProjects = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    const [
        left,
        right,
    ]: [
        TechnicalProjectRecord[],
        TechnicalProjectRecord[],
    ] = data.reduce(
        (acc, cur, i) => {
            if (i % 2 === 0) {
                acc[0].push(cur);
            } else {
                acc[1].push(cur);
            }

            return acc;
        },
        [[], []],
    );

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
                <ProjectsWrapper>
                    {left.map((record, i) => {
                        return (
                            <TechnicalProjectItem key={`technical-project-left-${i}`} technicalProjectRecord={record} />
                        );
                    })}
                </ProjectsWrapper>
                <ProjectsWrapper>
                    {right.map((record, i) => {
                        return (
                            <TechnicalProjectItem
                                key={`technical-project-right-${i}`}
                                technicalProjectRecord={record}
                            />
                        );
                    })}
                </ProjectsWrapper>
            </GenericGridContainer>
        </GenericContainer>
    );
};

export default TechnicalProjects;
