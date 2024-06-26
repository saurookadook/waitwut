import React, { MouseEventHandler, useState } from 'react';
import classNames from 'classnames';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {
    GenericHeading, // force formatting
    GenericContainer,
    LocationText,
    NameAndLocationWrapper,
    ToggleIcon,
} from 'resume/styled';
import resumeIconsMap from 'resume/icons';
import { themeColors } from 'themes/index';
import { toKebabCase, collapsedOrExpanded } from 'utils/index';
import {
    EmploymentItemGrid, // force formatting
    EmploymentItemContainer,
    CompanyName,
    ExpandableDetails,
    ExpandableDetailsItemWrapper,
    EmploymentIconWrapper,
} from './styled';

const EmploymentItem = ({
    employmentRecord, // force formatting
}: {
    employmentRecord: EmploymentRecord;
}): React.ReactElement => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const handleToggleOnClick = (): void => setIsCollapsed(!isCollapsed);

    const { company, roles, responsibilities } = employmentRecord;
    const companyNameClass = toKebabCase(company.name).toLowerCase();
    const Icon = resumeIconsMap[companyNameClass];

    return (
        <EmploymentItemContainer className={classNames(collapsedOrExpanded(isCollapsed), companyNameClass)}>
            <EmploymentItemGrid>
                <NameAndLocationWrapper>
                    <ToggleIcon onClick={handleToggleOnClick as MouseEventHandler}>
                        {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                    </ToggleIcon>
                    <CompanyName onClick={handleToggleOnClick as MouseEventHandler}>{company.name}</CompanyName>
                    <LocationText
                        // as="span"
                        className="togglable"
                    >
                        {/* <i> */}
                        {company.location.city}, {company.location.state}
                        {/* </i> */}
                    </LocationText>
                </NameAndLocationWrapper>
                <ExpandableDetails className="togglable">
                    <ExpandableDetailsItemWrapper className="role flex-column">
                        {roles.map(
                            (role, i): React.ReactElement => (
                                <span className="role-item" key={`role-item-${i}`}>
                                    <b>{role.title}</b>{' '}
                                    <span className="role-item-dates">
                                        :: <i>{`${role.startDate} - ${role.endDate}`}</i>
                                    </span>
                                </span>
                            ),
                        )}
                    </ExpandableDetailsItemWrapper>
                    {(responsibilities || []).length >= 1 && (
                        <ExpandableDetailsItemWrapper className="responsibilities">
                            <ul>
                                {responsibilities?.map((responsibility, j) => (
                                    <li
                                        key={`responsibility-${j}`}
                                        dangerouslySetInnerHTML={{ __html: responsibility }}
                                    />
                                ))}
                            </ul>
                        </ExpandableDetailsItemWrapper>
                    )}
                </ExpandableDetails>
                {Icon && (
                    <EmploymentIconWrapper className={companyNameClass}>
                        <Icon />
                    </EmploymentIconWrapper>
                )}
            </EmploymentItemGrid>
        </EmploymentItemContainer>
    );
};

const Employment = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <GenericContainer
            overrides={{
                // force formatting
                backgroundColor: themeColors.darkerPurpleHex,
                color: themeColors.white,
            }}
        >
            <GenericHeading overrides={{ paddingBottom: '0.25em' }}>{heading}</GenericHeading>
            {data.map((record, i) => (
                <EmploymentItem key={`employment-item-${i}`} employmentRecord={record} />
            ))}
        </GenericContainer>
    );
};

export default Employment;
