import * as React from 'react';
import Parser from 'html-react-parser';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { utledTekst } from '../../finn-tekst';
import LenkeAktivitetsplanKnapp from './lenke-aktivitetsplan-knapp';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import { AppState } from '../../redux/reducer';
import { connect } from 'react-redux';

const velgMaalBilde = require('../../ikoner/check_blaa.svg');

interface StateProps {
    oppfolging: OppfolgingState;
    oppfolgingsEnhet: OppfolgingsEnhet;
}

class HarSendtMelding extends React.Component<StateProps> {
    constructor(props: StateProps) {
        super(props);
    }

    render() {
        const {oppfolging, oppfolgingsEnhet} = this.props;
        const navKontor = oppfolgingsEnhet.navn || 'ditt Nav-kontor';
        const tekstIdTarKontakt = oppfolging.underOppfolging
            ? Parser(utledTekst('kontaktenav-veileder-tar-kontakt'))
            : Parser(utledTekst('kontaktenav-kontor-tar-kontakt', [navKontor]));
        return (
            <div className="har-sendt-melding panel panel--border">
                <div className="har-sendt-melding__ikon">
                    <img src={velgMaalBilde} alt=""/>
                </div>
                <Sidetittel tag="h1" className="har-sendt-melding__tittel blokk-s">
                    {Parser(utledTekst('kontaktenav-beskjed-sendt-nav', [navKontor]))}
                </Sidetittel>
                <Normaltekst className="har-sendt-melding__ingress blokk-s">
                    {tekstIdTarKontakt}
                </Normaltekst>
                {oppfolging.underOppfolging && (
                    <LenkeAktivitetsplanKnapp/>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
});

export default connect(mapStateToProps)(HarSendtMelding);
