import * as React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import './flere-tiltak.less';

const lenkeTiltak = 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb'; // tslint:disable-line

export function FlereTiltak() {
    return (
        <section className="flere-tiltak">
            <Undertittel className="blokk-xs">NAV har flere tiltak</Undertittel>
            <Normaltekst>
                Kanskje noen av dem kan passe deg?&nbsp;
                <a className="lenke" href={lenkeTiltak}>Les om alle tiltakene til NAV</a>
            </Normaltekst>
        </section>
    );
}