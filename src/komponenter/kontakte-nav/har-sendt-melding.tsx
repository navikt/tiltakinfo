import * as React from 'react';
import Parser from 'html-react-parser';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';

const velgMaalBilde = require('../../ikoner/check_blaa.svg');

const HarSendtMelding = () => {
    return (
        <div className="har-sendt-melding panel panel--border">
            <div className="har-sendt-melding__ikon">
                <img src={velgMaalBilde} alt=""/>
            </div>
            <Sidetittel tag="h1" className="har-sendt-melding__tittel blokk-s">
                {Parser(utledTekst('beskjed-sendt-nav-baerum'))}
            </Sidetittel>
            <Normaltekst>
                {Parser(utledTekst('nav-baerum-tar-kontakt'))}
            </Normaltekst>
        </div>
    );
};

export default HarSendtMelding;
