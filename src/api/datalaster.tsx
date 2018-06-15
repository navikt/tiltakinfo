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
    if (avhengigheter.some(a => a.status === Status.LASTER)) {
        return <Spinner type="XXL" />;
    }
    return children;
};

export default Datalaster;
