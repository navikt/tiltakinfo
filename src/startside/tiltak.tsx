import * as React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './tiltak.less';
import Lenkepanel from 'nav-frontend-lenkepanel/lib/index';
import tekst from '../finn-tekst';

export function Tiltak() {

    const tiltakListe = [];
    tiltakListe.push({
        tittel: 'Lønnstilskudd',
        hva: 'Har du en arbeidsgiver som er interessert i å ansette deg? Trenger du tid for å kunne yte full innsats? NAV kan dekke deler av lønnen din en periode. Hvor mye NAV skal dekke, vurderer du sammen med arbeidsgiveren og NAV.', // tslint:disable-line:max-line-length
        ikon: require('../ikoner/tiltak-01.svg'),
        style: 'style1',
        url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Tilskudd+til+lonnsutgifter', // tslint:disable-line:max-line-length
    });
    tiltakListe.push({
        tittel: 'Oppfølging',
        hva: 'Trenger du mer støtte enn det NAV kan gi for å komme i jobb? Da kan dette være noe for deg. Du kan få råd og veiledning for å bli en bedre jobbsøker, eller hjelp til å finne og kontakte arbeidsgivere. Eller kanskje du trenger støtte til noe annet for å komme i jobb?', // tslint:disable-line:max-line-length
        ikon: require('../ikoner/tiltak-02.svg'),
        style: 'style2',
        url: 'https://www.nav.no/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Tiltak+for+a+komme+i+jobb/Relatert+innhold/oppf%C3%B8lging', // tslint:disable-line:max-line-length
    });

    return (
        <section className="tiltak-oversikt blokk-m">
            {tiltakListe.map((tiltak) =>
                <div key={tiltak.tittel} className="tiltak">
                    <div className={`tiltak-header ${tiltak.style}`}>
                        <img src={tiltak.ikon} alt="" className="tiltak-ikon"/>
                    </div>
                    <div className="tiltak-innhold">
                        <Undertittel className="blokk-xs">{tiltak.tittel}</Undertittel>
                        <Element>{tekst('startside-tiltak-hva')}</Element>
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
