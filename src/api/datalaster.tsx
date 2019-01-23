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
    ventPa?: DataElement[];
    children: React.ReactElement<any>; // tslint:disable-line:no-any
    feilmeldingId?: string;
}

const harStatus = (dataElement: DataElement, status: Status): boolean => {
    return dataElement.status === status;
};

const Datalaster = ({avhengigheter, ventPa, children, feilmeldingId}: DatalasterProps) => {
    const feilmelding = feilmeldingId ? feilmeldingId : 'feilmelding-tekniskfeil';
    if (avhengigheter.every(a => harStatus(a, Status.OK)) &&
        (!ventPa ||
            ventPa.every(a => harStatus(a, Status.OK) || harStatus(a, Status.FEILET)))) {
        // Alle avhengigheter lastet inn uten problemer og ventPa er ferdig (enten OK eller FEILET)
        return children;
    } else if (avhengigheter.some(a => harStatus(a, Status.FEILET))) {
        return (
            <AlertStripe type="advarsel" className={'feilmelding-container'}>
                <Tekst id={feilmelding}/>
            </AlertStripe>
        );
    }

    return <Spinner type="XXL"/>;
};

export default Datalaster;
