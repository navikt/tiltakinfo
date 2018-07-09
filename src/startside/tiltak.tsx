import * as React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import './tiltak.less';
import Lenkepanel from 'nav-frontend-lenkepanel/lib/index';
import tiltakListe from '../ledetekster/tiltak-config';
import Tekst from '../finn-tekst';

export function Tiltak() {
    return (
        <section className="tiltak-oversikt blokk-m">
            {tiltakListe.map((tiltak) =>
                <div key={tiltak.tittel} className="tiltak">
                    <div className="tiltak-header">
                        <Innholdstittel className="tiltak-header-tekst"><Tekst id={tiltak.tittel}/></Innholdstittel>
                        <img src={tiltak.ikon} alt="" className="tiltak-ikon"/>
                    </div>
                    <div className="tiltak-innhold blokk-xxs">
                        <Normaltekst><Tekst id={tiltak.hva}/></Normaltekst>
                    </div>
                    <Lenkepanel href={tiltak.url} tittelProps="element">
                        <Tekst id={tiltak.lesmer}/>
                    </Lenkepanel>
                </div>
            )}
        </section>
    );
}
