import * as React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import './flere-tiltak.less';
import tekst from '../finn-tekst';

const lenkeTiltak = 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb'; // tslint:disable-line

export function FlereTiltak() {
    return (
        <section className="flere-tiltak">
            <Undertittel className="blokk-xs">{tekst('startside-fleretiltak-header')}</Undertittel>
            <Normaltekst>
                {tekst('startside-fleretiltak-passedeg')}&nbsp;
                <a className="lenke" href={lenkeTiltak}>{tekst('startside-fleretiltak-lenke')}</a>
            </Normaltekst>
        </section>
    );
}