import React from 'react';
import styled from 'styled-components';

import { GenericContainer, GenericHeading, GenericGridContainer } from '../components';
import { resumeTheme, themeColors } from '../../../themes';

interface TechnicalProjectItemProps {
    technicalProjectRecord: TechnicalProjectRecord;
}

const TechnicalProjectItem = ({ technicalProjectRecord }: TechnicalProjectItemProps): React.ReactElement => {
    return (
        <div>
            <pre>{JSON.stringify(technicalProjectRecord, null, 4)}</pre>
        </div>
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
            <GenericHeading overrides={{ paddingBottom: '0.25em' }}>{heading}</GenericHeading>
            <GenericGridContainer>
                {data.map((record, i) => {
                    return <TechnicalProjectItem key={`technical-project-${i}`} technicalProjectRecord={record} />;
                })}
            </GenericGridContainer>
        </GenericContainer>
    );
};

export default TechnicalProjects;
