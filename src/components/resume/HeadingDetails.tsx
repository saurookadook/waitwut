import React from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { ContactInfo } from '../resume'

interface StyledHeaderProps extends ThemedStyledProps<any, any> {
    bgColor?: string
}

const StyledHeader = styled.header`
    background-color: ${(props: StyledHeaderProps) => props.bgColor};
    text-align: center;
`

const StyledNameHeading = styled.h1`
    font-size: 4rem;
`;

const StyledContactInfo = styled(ContactInfo)``;

const StyledIntroBlurb = styled.p`
    margin: 0 10vw;
    text-align: left;
`

interface HeadingDetailsProps {
    bgColor?: string
    headingData: HeadingData
}

const HeadingDetails = ({ bgColor, headingData }: HeadingDetailsProps): React.ReactElement => {
    // const { phone, email, sites } = headingData.contactInfo;
    return (
        <StyledHeader bgColor={bgColor}>
            <StyledNameHeading>{headingData.firstName} {headingData.lastName}</StyledNameHeading>
            <StyledContactInfo {...headingData.contactInfo} />
            <StyledIntroBlurb>{headingData.introBlurb}</StyledIntroBlurb>
        </StyledHeader>
    )
}

export default HeadingDetails;
