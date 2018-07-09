import * as React from 'react';
import { Ingress, Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Tekst from '../finn-tekst';

export function Informasjon() {

    return (
        <section className="blokk-s">
            <Sidetittel className="blokk-xs"><Tekst id={'startside-informasjon-header'}/></Sidetittel>
            <Ingress className="blokk-l"><Tekst id={'startside-informasjon-ingress'}/></Ingress>
            <Normaltekst><Tekst id={'startside-informasjon-totiltak'}/></Normaltekst>
        </section>
    );
}
