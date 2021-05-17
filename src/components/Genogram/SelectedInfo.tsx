import React from 'react';

export interface SelectedWrapperProps {
    data: SelectedInfoProps;
}
export interface SelectedInfoProps {
    key?: string;
    n?: string;
    s?: string;
}
export const SelectedInfo = (props: SelectedWrapperProps) => {
    const {key, n, s} = props.data;
    const formatGender = (genderStr: string | any) => {
        return genderStr === 'M' ? 'Male' : 'Female';
    }
    return (
        <ul>
            {key && <li><span>Selected Key : </span>{key}</li>}
            {n && <li><span>Name : </span>{n}</li>}
            {s && <li><span>Gender: </span>{formatGender(s)}</li>}
        </ul>
    )
}