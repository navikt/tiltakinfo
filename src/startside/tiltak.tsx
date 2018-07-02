import * as React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import './tiltak.less';
import Lenkepanel from 'nav-frontend-lenkepanel/lib/index';
import tiltakListe from '../ledetekster/tiltak-config';
import { Route } from 'react-router-dom';

export function Tiltak() {
    return (
        <section className="tiltak-oversikt blokk-m">
            {tiltakListe.map((tiltak) =>
                <div key={tiltak.tittel} className="tiltak">
                    <div className="tiltak-header">
                        <Innholdstittel className="tiltak-header-tekst">{tiltak.tittel}</Innholdstittel>
                        <img src={tiltak.ikon} alt="" className="tiltak-ikon"/>
                    </div>
                    <div className="tiltak-innhold">
                        <Normaltekst>{tiltak.hva}</Normaltekst>
                    </div>
                    <Route
                        path="/1"
                        render={() => (
                        <Lenkepanel href={tiltak.url} tittelProps="element">
                            {`Les mer om ${tiltak.tittel.toLowerCase()}`}
                        </Lenkepanel>
                    )}
                    />

                </div>
            )}
        </section>
    );
}
