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

class Datalaster extends React.Component<DatalasterProps> {
    constructor(props: DatalasterProps) {
        super(props);
    }
    render() {
        if (this.props.avhengigheter.every(a => a.status === Status.OK)) {
            return this.props.children;
        }
        return <Spinner type="XXL"/>;
    }
}

export default Datalaster;
