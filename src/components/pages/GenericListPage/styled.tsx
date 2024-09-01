import styled from 'styled-components';
import { Link } from 'gatsby';
import { Container } from '@mui/material';

const SheetContentContainer = styled(Container)`
    text-align: center;
`;

const StyledUl = styled.ul`
    width: 100%;
`;

const SheetLineItem = styled.li`
    /* display: inline-block; */
    list-style: none;
    /* max-width: 50%; */
    text-align: center;
    width: 100%;
`;

const SheetLineItemLink = styled(Link)`
    color: ${(props) => props?.theme?.color};
    text-decoration: none;

    &:hover {
        text-decoration: none;
    }
`;

export {
    SheetContentContainer, // force formatting
    StyledUl,
    SheetLineItem,
    SheetLineItemLink,
};
