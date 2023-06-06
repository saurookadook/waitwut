import React, { useState } from 'react';
import styled from 'styled-components';

const EmploymentItemContainer = styled.div`
    z-index: 1;

    &:hover {
        cursor: pointer;
    }
`;

const CompanyName = styled.h3`
    z-index: 1;

    &:hover {
        cursor: pointer;
    }
`;

const ExpandableDetails = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 0;

    &.collapsed {
        flex: 0;
        height: 0;
        max-height: 0;
        opacity: 0;
        transition: all 300ms ease-out;
    }

    &.expanded {
        flex: 1;
        height: auto;
        max-height: 100%;
        opacity: 1;
        transition: all 300ms ease-in;
    }
`;

interface EmploymentItemProps {
    employmentRecord: EmploymentRecord;
}

const EmploymentItem = ({ employmentRecord }: EmploymentItemProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggleOnClick = (event: MouseEvent): void => {
        event.stopPropagation();
        setIsCollapsed(!isCollapsed);
    };

    return (
        <EmploymentItemContainer>
            <CompanyName onClick={handleToggleOnClick}>{employmentRecord.company.name}</CompanyName>
            <ExpandableDetails className={isCollapsed ? 'collapsed' : 'expanded'}>
                {typeof employmentRecord === 'string' ? (
                    employmentRecord
                ) : (
                    <pre>{JSON.stringify(employmentRecord, null, 4)}</pre>
                )}
            </ExpandableDetails>
        </EmploymentItemContainer>
    );
};

const EmploymentContainer = styled.div``;

const Employment = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <EmploymentContainer>
            <h2>{heading}</h2>
            <span>Under Construction 🚧</span>
            {data.map((record, i) => (
                <EmploymentItem key={`${record.company.name}-${i}`} employmentRecord={record} />
            ))}
        </EmploymentContainer>
    );
};

export default Employment;
