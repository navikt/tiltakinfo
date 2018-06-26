import * as React from 'react';
import { Element, EtikettLiten, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import './tiltak.less';
import Lenkepanel from 'nav-frontend-lenkepanel/lib/index';
import tekst from '../finn-tekst';
import tiltakListe from '../ledetekster/tiltak-config';

export function Tiltak() {
    return (
        <section className="tiltak-oversikt blokk-m">
            {tiltakListe.map((tiltak) =>
                <div key={tiltak.tittel} className="tiltak">
                    <div className={`tiltak-header ${tiltak.style}`}>
                        <EtikettLiten className="text-align--left blokk-xxs">TILTAK</EtikettLiten>
                        <Innholdstittel>{tiltak.tittel}</Innholdstittel>
                        <img src={tiltak.ikon} alt="" className="tiltak-ikon"/>
                    </div>
                    <div className="tiltak-innhold">
                        <Element className="blokk-xxs">{tekst('startside-tiltak-hva')}</Element>
                        <Normaltekst>{tiltak.hva}</Normaltekst>
                    </div>
                    <Lenkepanel href={tiltak.url} tittelProps="element">
                        {`Les mer om ${tiltak.tittel}`}
                    </Lenkepanel>
                </div>
            )}
        </section>
    );
}
