import styled from 'styled-components';

import { GenericItemContainer } from 'resume/styled';
import { minWidth600 } from 'styles/mq';
import { allButLastChild } from 'styles/selectors';

const EducationItemContainer = styled(GenericItemContainer)`
    &${allButLastChild} {
        margin-bottom: 2rem;
    }

    & .name-and-location-wrapper {
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 0.5rem;

        & i {
            align-self: flex-start;
            margin-left: 0;
        }
    }

    ${minWidth600} {
        &:nth-child(2n + 1) {
            padding-right: 7.5rem;
        }
    }
`;

export { EducationItemContainer };
