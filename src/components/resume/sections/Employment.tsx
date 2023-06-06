import React from 'react';
import styled from 'styled-components';

const Employment = ({ heading, data }: SectionComponentProps): React.ReactElement => {
    return (
        <div>
            <h2>{heading}</h2>
            <span>Under Construction 🚧</span>
            {data.map((record, i) => (
                <span key={`${record.company.name}-${i}`}>
                    {typeof record === 'string' ? record : <pre>{JSON.stringify(record, null, 4)}</pre>}
                </span>
            ))}
        </div>
    );
};

export default Employment;
