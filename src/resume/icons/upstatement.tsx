import React from 'react';
import styled from 'styled-components';

const StyledU = styled.span`
    font-family: 'TT Ramillas', 'GT America', Arial, Helvetica, Verdana, sans-serif;
    font-size: 200px;
    height: 100px;
    scale: 75% 120%;
    width: auto;
`;

const UpstatementU = (): React.ReactElement => <StyledU>U</StyledU>;

export default UpstatementU;
