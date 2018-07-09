import * as React from 'react';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import './flere-tiltak.less';
import Tekst from '../finn-tekst';

const lenkeTiltak = 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb'; // tslint:disable-line

export function FlereTiltak() {
    return (
        <section className="flere-tiltak">
            <Undertittel className="blokk-xs"><Tekst id={'startside-fleretiltak-header'}/></Undertittel>
            <Normaltekst>
                <Tekst id={'startside-fleretiltak-passedeg'}/>&nbsp;
                <a className="lenke" href={lenkeTiltak}><Tekst id={'startside-fleretiltak-lenke'}/></a>
            </Normaltekst>
        </section>
    );
}