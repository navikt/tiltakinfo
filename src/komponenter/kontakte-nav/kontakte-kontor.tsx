import * as React from 'react';
import Parser from 'html-react-parser';
import { Normaltekst } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';

interface OwnProps {
    openModal: Function;
    oppfolgingsEnhet: OppfolgingsEnhet;
    oppfolging: OppfolgingState;
}

export function KontakteKontor({openModal, oppfolgingsEnhet, oppfolging}: OwnProps) {

    return (
        <div className="kontakte-kontor">
            <Normaltekst className="blokk-s">
                {Parser(utledTekst('tekst-ditt-kontor-er', [oppfolgingsEnhet.navn]))}
            </Normaltekst>
            <button className="knapp knapp--hoved" onClick={() => openModal()}>
                {Parser(utledTekst('kontaktenav-kontor', [oppfolgingsEnhet.navn]))}
            </button>
        </div>
    );
}

export default KontakteKontor;
