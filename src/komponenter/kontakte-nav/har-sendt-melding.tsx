import * as React from 'react';
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
        const navKontor = oppfolgingsEnhet.navn || 'ditt NAV-kontor';
        const tekstIdTarKontakt = oppfolging.underOppfolging
            ? utledTekst('kontaktenav-veileder-tar-kontakt')
            : utledTekst('kontaktenav-kontor-tar-kontakt', [navKontor]);
        return (
            <>
                <div className="har-sendt-melding__ikon">
                    <img src={velgMaalBilde} alt=""/>
                </div>
                <Sidetittel tag="h1" className="har-sendt-melding__tittel blokk-s">
                    {utledTekst('kontaktenav-beskjed-sendt-nav')}
                </Sidetittel>
                <Normaltekst className="har-sendt-melding__ingress blokk-m">
                    {tekstIdTarKontakt}
                </Normaltekst>
                {oppfolging.underOppfolging && (
                    <LenkeAktivitetsplanKnapp/>
                )}
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
});

export default connect(mapStateToProps)(HarSendtMelding);
