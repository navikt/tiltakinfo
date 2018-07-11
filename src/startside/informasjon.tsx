import * as React from 'react';
import { Ingress, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Tekst from '../finn-tekst';

export function Informasjon() {

    return (
        <section className="blokk-s">
            <Sidetittel className="blokk-xs"><Tekst id={'informasjon-header'}/></Sidetittel>
            <Ingress className="blokk-l"><Tekst id={'informasjon-ingress'}/></Ingress>
            <Normaltekst><Tekst id={'informasjon-totiltak'}/></Normaltekst>
        </section>
    );
}
