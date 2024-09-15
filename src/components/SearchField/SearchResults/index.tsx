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

const HitCount = () => {
    const { nbHits } = useStats();

    return (
        nbHits > 0 && (
            <div className="HitCount">
                {nbHits} result{nbHits !== 1 ? 's' : ''}
            </div>
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
        <div>
            <Link to={hit.fullPath}>
                <h4>
                    <Highlight attribute="title" hit={hit} />
                </h4>
            </Link>
            {/* <Snippet attribute="excerpt" hit={hit} /> */}
            <Snippet attribute="fullPath" hit={hit} />
        </div>
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
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    indices: SearchIndex[];
}) => {
    return (
        <div className={className}>
            {indices.map((index) => {
                return <HitsInIndex key={index.name} index={index} />;
            })}
            <PoweredBy />
        </div>
    );
};

export default SearchResults;
