import React from 'react';
import { Label } from './Label';


type Props = {
    label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input: React.FC<Props> = (props) => {
    const { label, children, ...rest } = props;
    return (
        <Label>
            <span>{props.label}</span>
            <input {...rest} />
        </Label>
    );
};

export { Input };