import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { AppState } from '../redux/reducer';
import { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import { BrukerType, brukertypeDuck } from '../redux/generic-reducers';
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

class BrukertypeTiltakProvider extends React.Component<BrukerProviderProps> {
    constructor(props: BrukerProviderProps) {
        super(props);
    }

    componentDidMount() {
        const brukertype: BrukerType = this.utledBrukertype();
        this.props.doSettBruker(brukertype);
    }

    utledBrukertype() {
        const {oppfolgingsstatus, syfoSituasjon} = this.props;

        if (syfoSituasjon.erSykmeldt) {
            if (syfoSituasjon.harArbeidsgiver) {
                return BrukerType.SYKMELDT_MED_ARBEIDSGIVER;
            } else {
                return BrukerType.SYKMELDT_UTEN_ARBEIDSGIVER;
            }
        } else if (oppfolgingsstatus.situasjon === SituasjonOption.SITUASJONSBESTEMT) {
            return BrukerType.ARBEIDSLEDIG_SITUASJONSBESTEMT;
        } else if (oppfolgingsstatus.situasjon === SituasjonOption.SPESIELT_TILPASSET) {
            return BrukerType.ARBEIDSLEDIG_SPESIELT_TILPASSET;
        } else {
            return BrukerType.UTENFOR_MAALGRUPPE;
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
    doSettBruker: (brukerType: BrukerType) => dispatch(brukertypeDuck.actionCreator({brukerType}))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrukertypeTiltakProvider);
