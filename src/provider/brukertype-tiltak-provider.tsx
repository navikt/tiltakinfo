import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { AppState } from '../redux/reducer';
import { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import { BrukerType, brukertypeDuck, tiltakDuck } from '../redux/generic-reducers';
import { SituasjonOption, tiltakMap } from '../komponenter/tiltak/tiltak-map';
import { TiltakId } from '../komponenter/tiltak/tiltak-config';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
}

interface DispatchProps {
    doSettBruker: (brukerType: BrukerType) => void;
    doSettTiltak: (tiltakEn: string, tiltakTo: string) => void;
}

type BrukerProviderProps = OwnProps & DispatchProps & StateProps;

class BrukertypeTiltakProvider extends React.Component<BrukerProviderProps> {
    constructor(props: BrukerProviderProps) {
        super(props);
    }

    componentDidMount() {
        const brukertype: BrukerType = this.utledBrukertype();
        this.props.doSettBruker(brukertype);

        if (brukertype !== BrukerType.SYKMELDT_MED_ARBEIDSGIVER && brukertype !== BrukerType.UTENFOR_MAALGRUPPE) {
            const tiltakNokler: TiltakId[] = this.utledTiltak(brukertype);
            this.props.doSettTiltak(tiltakNokler[0], tiltakNokler[1]);
        }
    }

    utledBrukertype(): BrukerType {
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

    utledTiltak(brukertype: BrukerType): TiltakId[] {

        const finnTiltakMapKey = (b: BrukerType): SituasjonOption => {
            if (b === BrukerType.SYKMELDT_UTEN_ARBEIDSGIVER) {
                return SituasjonOption.SYKMELDT_UTEN_ARBEIDSGIVER;
            } else if (b === BrukerType.ARBEIDSLEDIG_SITUASJONSBESTEMT) {
                return SituasjonOption.SITUASJONSBESTEMT;
            } else { // brukertype === BrukerType.ARBEIDSLEDIG_SPESIELT_TILPASSET
                return SituasjonOption.SPESIELT_TILPASSET;
            }
        };

        return tiltakMap[finnTiltakMapKey(brukertype)];
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
    doSettTiltak: (tiltakEn, tiltakTo) => dispatch(tiltakDuck.actionCreator({
        nokkelEn: tiltakEn,
        nokkelTo: tiltakTo
    })),
    doSettBruker: (brukerType: BrukerType) => dispatch(brukertypeDuck.actionCreator({brukerType}))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrukertypeTiltakProvider);
