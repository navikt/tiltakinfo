import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { hentOppfolging, OppfolgingState } from '../brukerdata/oppfolging-duck';
import { AppState } from '../redux/reducer';
import { OppfolgingsstatusState, hentOppfolgingsstatus } from '../brukerdata/oppfolgingsstatus-duck';
import { hentSyfo, SyfoSituasjonState } from '../brukerdata/syfo-duck';
import Datalaster from '../api/datalaster';
import { hentRegistrering, RegistreringState } from '../brukerdata/registrering-duck';
import { hentMeldingNavKontor, MeldingTilNavKontorState } from '../brukerdata/melding-til-nav-kontor-duck';
import { hentBrukernavn, BrukersNavnState } from '../brukerdata/brukernavn-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    oppfolging: OppfolgingState;
    registrering: RegistreringState;
    brukersNavn: BrukersNavnState;
    harSendtMelding: MeldingTilNavKontorState;
}

interface DispatchProps {
    doHentOppfolging: () => void;
    doHentOppfolgingsstatus: () => void;
    doHentSyfo: () => void;
    doHentRegistrering: () => void;
    doHentBrukersNavn: () => void;
    doHentMeldingNavKontor: () => void;
}

type DataProviderProps = OwnProps & DispatchProps & StateProps;

class DataProvider extends React.Component<DataProviderProps> {
    constructor(props: DataProviderProps) {
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
        const {oppfolgingsstatus, syfoSituasjon, oppfolging, registrering, brukersNavn, harSendtMelding} = this.props;
        return (
            <Datalaster
                avhengigheter={[oppfolgingsstatus, syfoSituasjon, oppfolging, brukersNavn, harSendtMelding]}
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
    brukersNavn: state.brukersNavn,
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
