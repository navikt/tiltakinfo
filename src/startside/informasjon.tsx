import * as React from 'react';
import { Ingress, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import './informasjon.less';

export function Informasjon() {

    return (
        <section className="informasjon">
            <Innholdstittel className="blokk-s">Ønsker du hjelp til å komme i jobb?</Innholdstittel>
            <Ingress className="blokk-s">NAV har registrert at du er arbeidsledig. For noen arbeidsledige kan det være
                aktuelt med et tiltak for å komme kjappere i jobb.</Ingress>
            <Normaltekst>Vi har derfor funnet frem to tiltak som kan passe for deg uten arbeidsgiver.</Normaltekst>
        </section>
    );
}
