import * as React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Lenkepanel from 'nav-frontend-lenkepanel/lib/index';

export function Tiltak() {

    const tiltakListe = [];
    tiltakListe.push({
        tittel: 'Lønnstilskudd',
        hvem: 'Deg som sliter med å få jobb på vanlige lønnsvilkår, ' +
        'har en kronisk eller langvarig sykdom, eller graviditet.',
        mal: 'Styrke kompetansen og motivasjonen din som jobbsøker, og å hjelpe deg med å søke jobb.',
        ikon: require('../ikoner/tiltak-01.svg'),
        style: 'style1',
        url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Tilskudd+til+lonnsutgifter', // tslint:disable-line:max-line-length
    });
    tiltakListe.push({
        tittel: 'Oppfølging',
        hvem: 'For deg som trenger omfattende hjelp til å skaffe en jobb.',
        mal: 'Styrke kompetansen og motivasjonen din som jobbsøker, og å hjelpe deg med å søke jobb.',
        ikon: require('../ikoner/tiltak-02.svg'),
        style: 'style2',
        url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Relatert+innhold/oppf%C3%B8lging', // tslint:disable-line:max-line-length
    });

    return (
        <section className="tiltak-oversikt">
            {tiltakListe.map((tiltak) =>
                <div key={tiltak.tittel} className="tiltak">
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
                    <Lenkepanel href={tiltak.url} tittelProps="element">Lenke</Lenkepanel>
                </div>
            )}
        </section>
    );
}
