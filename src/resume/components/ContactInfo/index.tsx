import React from 'react';

import { InfoContainer, InfoItem } from './styled';

interface SiteLinkProps {
    siteData: Site;
}

const SiteLink = ({ siteData }: SiteLinkProps): React.ReactElement => {
    return (
        <a href={siteData.url} target="_blank" rel="noreferrer">
            {siteData.displayText}
        </a>
    );
};

const ContactInfo = ({ phone, email, sites }: ContactInfo): React.ReactElement => {
    return (
        <InfoContainer>
            {phone != null && (
                <InfoItem>
                    <a href={`tel:+1-${phone}`} target="_blank" rel="noreferrer">
                        {phone}
                    </a>
                </InfoItem>
            )}
            {email != null && (
                <InfoItem>
                    <a href={`mailto:${email}`} target="_blank" rel="noreferrer">
                        {email}
                    </a>
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
