import * as React from 'react';
import Spinner from 'nav-frontend-spinner';

export enum Status {
    OK = 'OK',
    LASTER = 'LASTER',
    FEILET = 'FEILET',
    IKKE_STARTET = 'IKKE_STARTET',
}

export interface DataElement {
    status: Status;
}

interface DatalasterProps {
    avhengigheter: DataElement[];
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

const Datalaster = ({avhengigheter, children}: DatalasterProps) => {
    if (avhengigheter.every(a => a.status === Status.OK)) {
        return children;
    }
    return <Spinner type="XXL"/>;
};

export default Datalaster;
