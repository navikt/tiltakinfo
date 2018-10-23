import * as React from 'react';
import Spinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';
import Tekst from '../finn-tekst';

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
    } else if (avhengigheter.some(a => a.status === Status.FEILET)) {
        return (
            <AlertStripe type="advarsel" className={'app-content feilmelding-container'}>
                <Tekst id={'feilmelding-tekniskfeil'}/>
            </AlertStripe>);
    }
    return <Spinner type="XXL"/>;
};

export default Datalaster;
