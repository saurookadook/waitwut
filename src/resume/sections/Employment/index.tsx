import React, { MouseEventHandler, useState } from 'react';
import classNames from 'classnames';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    GenericHeading, // <- to force formatting
    GenericContainer,
    LocationText,
    NameAndLocationWrapper,
    ToggleIcon,
} from 'resume/components';
import { themeColors } from 'themes/index';
import { toKebabCase, collapsedOrExpanded } from 'utils/index';
import {
    EmploymentItemContainer, // <- to force formatting
    CompanyName,
    ExpandableDetails,
    ExpandableDetailsItemWrapper,
} from './styled';

interface EmploymentItemProps {
    employmentRecord: EmploymentRecord;
}

const EmploymentItem = ({ employmentRecord }: EmploymentItemProps): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const handleToggleOnClick = (): void => setIsCollapsed(!isCollapsed);

    const { company, roles, responsibilities } = employmentRecord;
    const companyNameClass = toKebabCase(company.name).toLowerCase();

    return (
        <EmploymentItemContainer className={classNames(collapsedOrExpanded(isCollapsed), companyNameClass)}>
            <NameAndLocationWrapper>
                <ToggleIcon onClick={handleToggleOnClick as MouseEventHandler}>
                    {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                </ToggleIcon>
                <CompanyName onClick={handleToggleOnClick as MouseEventHandler}>{company.name}</CompanyName>
                <LocationText className={'togglable'}>
                    {company.location.city}, {company.location.state}
                </LocationText>
            </NameAndLocationWrapper>
            <ExpandableDetails className={'togglable'}>
                <ExpandableDetailsItemWrapper className="flex-column">
                    {roles.map(
                        (role, i): React.ReactElement => (
                            <span className="role-item" key={`role-item-${i}`}>
                                <b>{role.title}</b> :: <i>{`${role.startDate} - ${role.endDate}`}</i>
                            </span>
                        ),
                    )}
                </ExpandableDetailsItemWrapper>
                {(responsibilities || []).length >= 1 && (
                    <ExpandableDetailsItemWrapper>
                        <ul>
                            {responsibilities?.map((responsibility, j) => (
                                <li key={`responsibility-${j}`} dangerouslySetInnerHTML={{ __html: responsibility }} />
                            ))}
                        </ul>
                    </ExpandableDetailsItemWrapper>
                )}
            </ExpandableDetails>
        </EmploymentItemContainer>
    );
};

const Employment = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <GenericContainer
            overrides={{
                // <- to force formatting
                backgroundColor: themeColors.darkerPurpleHex,
                color: themeColors.white,
                padding: '2em 0',
            }}
        >
            <GenericHeading overrides={{ padding: '0 10vw 0.25em' }}>{heading}</GenericHeading>
            {data.map((record, i) => (
                <EmploymentItem key={`employment-item-${i}`} employmentRecord={record} />
            ))}
        </GenericContainer>
    );
};

export default Employment;
