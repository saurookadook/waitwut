import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
    Box,
    CssBaseline,
    Container,
    Typography
} from '@mui/material';

const SheetContentContainer = styled(Container)`
    text-align: center;
`;

const SheetPage = () => {
    return (
        <SheetContentContainer>
            <Typography variant="h2">
                {`Some day, I'll have content 🙂`}
            </Typography>
        </SheetContentContainer>
        // <SheetContentContainer container spacing={12}>
        //     {ants.map((ant: Ant, index: number) => {
        //         // console.log(`ant #${index}: `, ant);

        //         const localProps: AntGridItemProps = {
        //             ant: ant,
        //             antId: `ant-${index}`,
        //             antWinChance: generateAntWinLikelihoodCalculator(),
        //             updateRaceState: setAntWinLikelihoodStateByAntId,
        //             shouldStartRace
        //         };

        //         // TODO: would be preferable to just assign directly to `WinLikelihoodStates.DEFAULT`
        //         antWinLikelihoodStates[localProps.antId] = "default" as WinLikelihoodStates.DEFAULT;

        //         return (
        //             <AntGridItem
        //                 key={`ant-${index}`}
        //                 { ...localProps }
        //             />
        //         );
        //     })}
        // </SheetContentContainer>
    );
}

export default SheetPage;
