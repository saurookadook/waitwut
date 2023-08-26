import React, { MouseEventHandler, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    GenericContainer, // <- to force formatting
    GenericHeading,
    GenericGridContainer,
    ToggleIcon,
} from 'resume/components';
import { themeColors } from 'themes/index';
import { collapsedOrExpanded } from 'utils/index';
import {
    ProjectItemContainer, // <- to force formatting
    ProjectNameWrapper,
    ProjectDisplayName,
    ProjectDetails,
    ProjectLink,
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
