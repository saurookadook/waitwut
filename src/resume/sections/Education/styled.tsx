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
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 0.5rem;
    }

    ${minWidth600} {
        & .name-and-location-wrapper {
            align-items: flex-end;
            flex-direction: row;
        }
    }
`;

export { EducationItemContainer };
