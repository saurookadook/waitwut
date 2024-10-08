import React from 'react';
import { Link } from 'gatsby';
import {
    Highlight, // force formatting
    Hits,
    Index,
    Snippet,
    PoweredBy,
    useStats,
} from 'react-instantsearch';

import { StyledHitCount, StyledPageHit, StyledSearchResults } from './styled';

const HitCount = () => {
    const { nbHits } = useStats();

    return (
        nbHits > 0 && (
            <StyledHitCount>
                {nbHits} result{nbHits !== 1 ? 's' : ''}
            </StyledHitCount>
        )
    );
};

// type Hit = {
//     __position: number;
//     queryID?: string | undefined;
//     fullPath: string;
//     title: string;
// };

// TODO: maybe the docs have a good example for typing this
const PageHit = ({ hit }: { hit: any }) => {
    // console.log({ fn: 'PageHit', hit });
    return (
        <StyledPageHit>
            <Link to={hit.fullPath}>
                <h4>
                    <Highlight attribute="title" hit={hit} />
                </h4>
                <span>{hit.fullPath}</span>
            </Link>
            {/* <Snippet attribute="excerpt" hit={hit} /> */}
        </StyledPageHit>
    );
};

const HitsInIndex = ({ index }: { index: SearchIndex }) => {
    return (
        <Index indexName={index.name}>
            <HitCount />
            <Hits className="Hits" hitComponent={PageHit} />
        </Index>
    );
};

const SearchResults = ({
    className,
    indices,
    show,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    indices: SearchIndex[];
    show: boolean;
}) => {
    return (
        <StyledSearchResults className={className} $show={show}>
            {indices.map((index) => {
                return <HitsInIndex key={index.name} index={index} />;
            })}
            <PoweredBy />
        </StyledSearchResults>
    );
};

export default SearchResults;
