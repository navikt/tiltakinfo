import * as React from 'react';
import { Redirect as ReactRouterRedirect } from 'react-router-dom';

interface RedirectProps {
    path: string;
}

export default function Redirect({path}: RedirectProps) {
    return <ReactRouterRedirect to={path}/>;
}
