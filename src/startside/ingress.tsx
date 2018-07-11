import * as React from 'react';
import { Ingress as Ingresskomponent } from 'nav-frontend-typografi';
import Tekst from '../finn-tekst';

export function Ingress() {
    return (
        <section className="blokk-l">
            <Ingresskomponent><Tekst id={'informasjon-ingress'}/></Ingresskomponent>
        </section>
    );
}
