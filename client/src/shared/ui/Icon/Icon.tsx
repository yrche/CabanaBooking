import React = require('react');
import {memo} from "react";

export interface Icon {
    path: string,
    size: number,
    rotate: number,
    filter?: string,
}

export const Icon = memo((props: Icon) => {
    const {path, size, rotate, filter} = props;

    return (
        <img
            src={path}
            alt={path}
            width={size}
            height={size}
            style={{
                transform: `rotate(${rotate}deg)`,
                filter: filter
            }}
        />
    );
});