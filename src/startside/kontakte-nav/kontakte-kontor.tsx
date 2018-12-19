import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

interface State {
    openModal: Function;
}

const KontakteKontor = ({openModal}: State) => (
    <div className="kontakte-kontor">
        <Normaltekst className="blokk-s">
            Ditt kontor er <strong>NAV Bærum</strong>.
        </Normaltekst>
        <button className="knapp knapp--hoved" onClick={() => openModal()}>
            Kontakt NAV Bærum
        </button>
    </div>
);

export default KontakteKontor;
