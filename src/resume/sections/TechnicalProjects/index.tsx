import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    GenericContainer, // force formatting
    GenericHeading,
    GenericGridContainer,
    ToggleIcon,
} from 'resume/styled';
import GitHubOctocat from 'resume/icons/github';
import { themeColors } from 'themes/index';
import { collapsedOrExpanded, isWindowDefined } from 'utils/index';
import {
    ProjectItemContainer, // force formatting
    ProjectNameWrapper,
    ProjectDisplayName,
    ProjectDetails,
    ProjectLink,
    ProjectLinkText,
    SubText,
} from './styled';

const TechnicalProjectItem = ({
    technicalProjectRecord, // force formatting
}: {
    technicalProjectRecord: TechnicalProjectRecord;
}): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isClickable, setIsClickable] = useState(false);

    const handleToggleOnClick = (): void => {
        if (!isCollapsed) {
            setTimeout(() => setIsClickable(!isClickable), 500);
        } else {
            setIsClickable(!isClickable);
        }

        setTimeout(() => setIsCollapsed(!isCollapsed), 0);
    };

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
            <ProjectDetails
                className={classNames(
                    'togglable', // force formatting
                    'project-details',
                    isClickable && 'clickable',
                )}
            >
                {links.map((link, i) => (
                    <ProjectLink key={`project-link-${i}`} href={link.url} target="_blank" rel="noreferrer">
                        <ProjectLinkText>
                            {link.type === 'github repository' && <GitHubOctocat height={24} width={24} />}
                            {link.url.replace('https://github.com/', '')}
                        </ProjectLinkText>
                    </ProjectLink>
                ))}

                <SubText className="project-dates">
                    <i>
                        ({startDate} - {endDate})
                    </i>
                </SubText>

                <SubText dangerouslySetInnerHTML={{ __html: description }} />
            </ProjectDetails>
        </ProjectItemContainer>
    );
};

const ProjectsWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const MobileGridContainer = ({
    data, // force formatting
}: {
    data: TechnicalProjectRecord[];
}): React.ReactElement => {
    const [left, right] = data.reduce(
        (acc, cur, i) => {
            if (i % 2 === 0) {
                acc[0].push(cur);
            } else {
                acc[1].push(cur);
            }

            return acc;
        },
        [[], []] as [TechnicalProjectRecord[], TechnicalProjectRecord[]],
    );

    return (
        <GenericGridContainer>
            <ProjectsWrapper>
                {left.map((record, i) => {
                    return <TechnicalProjectItem key={`technical-project-left-${i}`} technicalProjectRecord={record} />;
                })}
            </ProjectsWrapper>
            <ProjectsWrapper>
                {right.map((record, i) => {
                    return (
                        <TechnicalProjectItem key={`technical-project-right-${i}`} technicalProjectRecord={record} />
                    );
                })}
            </ProjectsWrapper>
        </GenericGridContainer>
    );
};

const DefalutGridContainer = ({
    data, // force formatting
}: {
    data: TechnicalProjectRecord[];
}): React.ReactElement => {
    return (
        <GenericGridContainer>
            <ProjectsWrapper>
                {data.map((record, i) => {
                    return (
                        <TechnicalProjectItem // force formatting
                            key={`technical-project-left-${i}`}
                            technicalProjectRecord={record}
                        />
                    );
                })}
            </ProjectsWrapper>
        </GenericGridContainer>
    );
};

const TechnicalProjects = ({
    heading,
    data,
}: {
    heading: string;
    data: TechnicalProjectRecord[];
}): React.ReactElement => {
    const media = isWindowDefined() ? window.matchMedia('(min-width: 600px)') : { matches: false };
    const [isMobile, setIsMobile] = useState<boolean>(media.matches);

    useEffect(() => {
        if (media.matches !== isMobile) {
            setIsMobile(media.matches);
        }
    }, [media.matches, isMobile]);

    return (
        <GenericContainer
            overrides={{
                backgroundColor: themeColors.stringGreen, // force formatting
                color: themeColors.blackHex,
            }}
        >
            <GenericHeading overrides={{ padding: '0' }}>{heading}</GenericHeading>
            {isMobile ? ( // force formatting
                <MobileGridContainer data={data} />
            ) : (
                <DefalutGridContainer data={data} />
            )}
        </GenericContainer>
    );
};

export default TechnicalProjects;
