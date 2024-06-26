import React from 'react';

import { ExternalLinkWrapper } from 'common/components';
import { InfoContainer, InfoItem } from './styled';

const SiteLink = ({
    siteData, // force formatting
}: {
    siteData: Site;
}): React.ReactElement => {
    return <ExternalLinkWrapper href={siteData.url}>{siteData.displayText}</ExternalLinkWrapper>;
};

const ContactInfo = ({ phone, email, sites }: ContactInfo): React.ReactElement => {
    return (
        <InfoContainer>
            {phone != null && (
                <InfoItem>
                    <ExternalLinkWrapper href={`tel:+1-${phone}`}>{phone}</ExternalLinkWrapper>
                </InfoItem>
            )}
            {email != null && (
                <InfoItem>
                    <ExternalLinkWrapper href={`mailto:${email}`}>{email}</ExternalLinkWrapper>
                </InfoItem>
            )}
            {sites.map((site, i) => (
                <InfoItem key={`${site.type}-${i}`}>
                    <SiteLink siteData={site} />
                </InfoItem>
            ))}
        </InfoContainer>
    );
};

export default ContactInfo;
