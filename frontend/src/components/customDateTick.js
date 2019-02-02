import React from 'react';

const customDateTick = (props) =>{
    const {x, y, stroke, payload} = this.props;
        
        return (
        <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value + 'yo'}</text>
    </g>
    );
};

export default customDateTick;