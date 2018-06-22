import * as React from 'react';
import { Ingress, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import tekst from '../finn-tekst';

export function Informasjon() {

    return (
        <section className="blokk-m">
            <Innholdstittel className="blokk-s">{tekst('startside-informasjon-header')}</Innholdstittel>
            <Ingress className="blokk-s">{tekst('startside-informasjon-ingress')}</Ingress>
            <Normaltekst>{tekst('startside-informasjon-totiltak')}</Normaltekst>
        </section>
    );
}
