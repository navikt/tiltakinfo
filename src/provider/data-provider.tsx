import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { hentOppfolging, OppfolgingState } from '../brukerdata/oppfolging-duck';
import { AppState } from '../redux/reducer';
import { OppfolgingsstatusState, hentOppfolgingsstatus } from '../brukerdata/oppfolgingsstatus-duck';
import { hentSyfo, SyfoSituasjonState } from '../brukerdata/syfo-duck';
import Datalaster from '../api/datalaster';
import { hentRegistrering, RegistreringState } from '../brukerdata/registrering-duck';
import { hentBrukernavn } from '../redux/brukernavn-duck';
import { hentMeldingNavKontor, MeldingNavKontorState } from '../brukerdata/melding-nav-kontor-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    oppfolging: OppfolgingState;
    registrering: RegistreringState;
    harSendtMelding: MeldingNavKontorState;
}

interface DispatchProps {
    doHentOppfolging: () => void;
    doHentOppfolgingsstatus: () => void;
    doHentSyfo: () => void;
    doHentRegistrering: () => void;
    doHentBrukersNavn: () => void;
    doHentMeldingNavKontor: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps & StateProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentOppfolging();
        this.props.doHentOppfolgingsstatus();
        this.props.doHentSyfo();
        this.props.doHentRegistrering();
        this.props.doHentBrukersNavn();
        this.props.doHentMeldingNavKontor();
    }

    render() {
        const {oppfolgingsstatus, syfoSituasjon, oppfolging, registrering} = this.props;
        return (
            <Datalaster
                avhengigheter={[oppfolgingsstatus, syfoSituasjon, oppfolging]}
                ventPa={[registrering]}
            >
                {this.props.children}
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolgingsstatus: state.oppfolgingsstatus,
    syfoSituasjon: state.syfoSituasjon,
    oppfolging: state.oppfolging,
    registrering: state.registrering,
    harSendtMelding: state.harSendtMelding,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentOppfolging: () => hentOppfolging()(dispatch),
    doHentOppfolgingsstatus: () => hentOppfolgingsstatus()(dispatch),
    doHentSyfo: () => hentSyfo()(dispatch),
    doHentRegistrering: () => hentRegistrering()(dispatch),
    doHentBrukersNavn: () => hentBrukernavn()(dispatch),
    doHentMeldingNavKontor: () => hentMeldingNavKontor()(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
