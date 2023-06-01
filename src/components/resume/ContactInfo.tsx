import React from 'react';
import styled from 'styled-components';

const InfoItem = styled.span`
    &:not(:last-child) {
        margin-right: 0.5rem;
    }
`;

interface SiteLinkProps {
    siteData: Site
}

const SiteLink = ({ siteData }: SiteLinkProps): React.ReactElement => {
    return <a href={siteData.url} target="_blank" rel="noreferrer">{siteData.displayText}</a>
}

const ContactInfo = ({ phone, email, sites }: ContactInfo): React.ReactElement => {
    return (
        <p>
            <InfoItem>{phone}</InfoItem>
            <InfoItem>{email}</InfoItem>
            {sites.map((site, i) => (
                <InfoItem key={`${site.type}-${i}`}>
                    <SiteLink siteData={site} />
                </InfoItem>
            ))}
        </p>
    );
}

export default ContactInfo;
