import * as React from 'react';
import { Ingress, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import './informasjon.less';
import tekst from '../finn-tekst';

export function Informasjon() {

    return (
        <section className="informasjon">
            <Innholdstittel className="blokk-s">{tekst('startside-informasjon-hjelp')}</Innholdstittel>
            <Ingress className="blokk-s">{tekst('startside-informasjon-registrert')}</Ingress>
            <Normaltekst>{tekst('startside-informasjon-tiltak')}</Normaltekst>
        </section>
    );
}
