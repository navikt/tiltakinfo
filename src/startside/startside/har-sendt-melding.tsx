import * as React from 'react';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';

const velgMaalBilde = require('../../ikoner/check_blaa.svg');

const HarSendtMelding = () => {
    return (
        <div className="har-sendt-melding panel panel--border">
            <div className="har-sendt-melding__ikon">
                <img src={velgMaalBilde} alt=""/>
            </div>
            <Sidetittel tag="h1" className="har-sendt-melding__tittel blokk-s">
                NAV Bærum har fått beskjed
            </Sidetittel>
            <Normaltekst>
                Du har sagt ifra til NAV Bærum om at du ønsker å snakke om muligheter.
                De tar kontakt med deg innen et par dager.
            </Normaltekst>
        </div>
    )
};

export default HarSendtMelding;
