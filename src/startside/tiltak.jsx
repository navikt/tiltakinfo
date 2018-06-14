import * as React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';

export function Tiltak() {

    const tiltakListe = [];
    tiltakListe.push({
        tittel: 'Lønnstilskudd',
        hvem: 'Deg som sliter med å få jobb på vanlige lønnsvilkår, har en kronisk eller langvarig sykdom, eller graviditet.',
        mal: 'Styrke kompetansen og motivasjonen din som jobbsøker, og å hjelpe deg med å søke jobb.',
        ikon: require('../ikoner/tiltak-01.svg'),
        style: 'style1',
    });
    tiltakListe.push({
        tittel: 'Oppfølging',
        hvem: 'For deg som trenger omfattende hjelp til å skaffe en jobb',
        mal: 'Styrke kompetansen og motivasjonen din som jobbsøker, og å hjelpe deg med å søke jobb.',
        ikon: require('../ikoner/tiltak-02.svg'),
        style: 'style2',
    });

    return (
        <section className="tiltak-oversikt">
            {tiltakListe.map((tiltak) =>
                <div className="tiltak">
                    <div className={`tiltak-header ${tiltak.style}`}>
                        <img src={tiltak.ikon} alt="" className="tiltak-ikon"/>
                    </div>
                    <div className="tiltak-innhold">
                        <Undertittel className="blokk-xs">{tiltak.tittel}</Undertittel>
                        <Element>Hvem</Element>
                        <Normaltekst className="blokk-xs">{tiltak.hvem}</Normaltekst>
                        <Element>Mål</Element>
                        <Normaltekst>{tiltak.mal}</Normaltekst>
                    </div>
                </div>
            )}
        </section>
    );
}
