import React from 'react';

import {
    StyledHeader, // <- to force formatting
    StyledNameHeading,
    StyledContactInfo,
    StyledIntroBlurb,
} from './styled';

interface HeadingDetailsProps {
    headingData: HeadingData;
}

const HeadingDetails = ({ headingData }: HeadingDetailsProps): React.ReactElement => {
    return (
        <StyledHeader>
            <StyledNameHeading>
                {headingData.firstName} {headingData.lastName}
            </StyledNameHeading>
            <StyledContactInfo {...headingData.contactInfo} />
            <StyledIntroBlurb>{headingData.introBlurb}</StyledIntroBlurb>
        </StyledHeader>
    );
};

export default HeadingDetails;
