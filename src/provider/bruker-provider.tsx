import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { AppState } from '../redux/reducer';
import { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import { brukerDuck, BrukerType } from '../redux/generic-reducers';
import { SituasjonOption } from '../komponenter/tiltak/tiltak-map';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
}

interface DispatchProps {
    doSettBruker: (brukerType: BrukerType) => void;
}

type BrukerProviderProps = OwnProps & DispatchProps & StateProps;

class BrukerProvider extends React.Component<BrukerProviderProps> {
    constructor(props: BrukerProviderProps) {
        super(props);
    }

    componentDidMount() {
        const {oppfolgingsstatus, syfoSituasjon} = this.props;

        if (syfoSituasjon.erSykmeldt) {
            if (syfoSituasjon.harArbeidsgiver) {
                this.props.doSettBruker(BrukerType.SYKMELDT_MED_ARBEIDSGIVER);
            } else {
                this.props.doSettBruker(BrukerType.SYKMELDT_UTEN_ARBEIDSGIVER);
            }
        } else if (oppfolgingsstatus.situasjon === SituasjonOption.SITUASJONSBESTEMT) {
            this.props.doSettBruker(BrukerType.ARBEIDSLEDIG_SITUASJONSBESTEMT);
        } else if (oppfolgingsstatus.situasjon === SituasjonOption.SPESIELT_TILPASSET) {
            this.props.doSettBruker(BrukerType.ARBEIDSLEDIG_SPESIELT_TILPASSET);
        } else {
            this.props.doSettBruker(BrukerType.UTENFOR_MAALGRUPPE);
        }

    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolgingsstatus: state.oppfolgingsstatus,
    syfoSituasjon: state.syfoSituasjon,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettBruker: (brukerType: BrukerType) => dispatch(brukerDuck.actionCreator({brukerType}))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrukerProvider);
