import styled from 'styled-components';

import { minWidth600 } from 'styles/mq';

const EducationItemContainer = styled.div`
    /* all but last child */
    &:nth-last-child(n + 2) {
        margin-bottom: 2rem;
    }

    ${minWidth600} {
        &:nth-child(2n + 1) {
            padding-right: 7.5rem;
        }
    }

    & .name-and-location-wrapper {
        margin-bottom: 0.5rem;
    }
`;

export { EducationItemContainer };
