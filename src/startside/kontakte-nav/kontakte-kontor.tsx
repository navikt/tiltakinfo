import * as React from 'react';
import Parser from 'html-react-parser';
import { Normaltekst } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';

interface State {
    openModal: Function;
}

const KontakteKontor = ({openModal}: State) => (
    <div className="kontakte-kontor">
        <Normaltekst className="blokk-s">
            {Parser(utledTekst('tekst-ditt-kontor-er'))}
        </Normaltekst>
        <button className="knapp knapp--hoved" onClick={() => openModal()}>
            {Parser(utledTekst('kontakte-nav-baerum'))}
        </button>
    </div>
);

export default KontakteKontor;
