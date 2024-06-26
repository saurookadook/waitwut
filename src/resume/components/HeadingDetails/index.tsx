import React from 'react';

import {
    StyledHeader, // force formatting
    StyledNameHeading,
    StyledContactInfo,
    StyledIntroBlurb,
} from './styled';

const HeadingDetails = ({
    headingData, // force formatting
}: {
    headingData: HeadingData;
}): React.ReactElement => {
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
