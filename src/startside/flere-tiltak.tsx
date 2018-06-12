import * as React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import './flere-tiltak.less';

const lenkeTiltak = 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb'; // tslint:disable-line

export function FlereTiltak() {
    return (
        <div className="flere-tiltak">
            <Undertittel className="blokk-xs">NAV har flere tiltak</Undertittel>
            <Normaltekst className="blokk-xxs">Kanskje noen av dem kan passe deg?</Normaltekst>
            <a href={lenkeTiltak}>Les om alle tiltakene til NAV</a>
        </div>
    );
}