import * as React from 'react';
import { Ingress, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import tekst from '../finn-tekst';

export function Informasjon() {

    return (
        <section className="blokk-m">
            <Sidetittel className="blokk-s">{tekst('startside-informasjon-header')}</Sidetittel>
            <Ingress className="blokk-s">{tekst('startside-informasjon-ingress')}</Ingress>
            <Normaltekst>{tekst('startside-informasjon-totiltak')}</Normaltekst>
        </section>
    );
}
