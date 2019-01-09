import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { AppState } from '../redux/reducer';
import { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import { BrukerType, brukertypeDuck, maalDuck, tiltakDuck } from '../redux/generic-reducers';
import { MaalOption, SituasjonOption, tiltakMap } from '../komponenter/tiltak/tiltak-map';
import { TiltakId } from '../komponenter/tiltak/tiltak-config';
import { MaalFraRegistrering } from '../brukerdata/registrering-duck';
import { mapTilMaalOption } from '../mock/utils';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    maalId: MaalOption;
    maalFraRegistrering: MaalFraRegistrering;
}

interface DispatchProps {
    doSettBruker: (brukerType: BrukerType) => void;
    doSettTiltak: (tiltakEn: string, tiltakTo: string) => void;
    doSettMaalId: (id: MaalOption) => void;
}

type BrukerProviderProps = OwnProps & DispatchProps & StateProps;

class BrukertypeTiltakProvider extends React.Component<BrukerProviderProps> {
    constructor(props: BrukerProviderProps) {
        super(props);
    }

    componentDidMount() {
        const { doSettBruker, doSettTiltak, maalId, maalFraRegistrering, doSettMaalId } = this.props;

        const brukertype: BrukerType = this.utledBrukertype();
        doSettBruker(brukertype);

        if (brukertype !== BrukerType.SYKMELDT_MED_ARBEIDSGIVER && brukertype !== BrukerType.UTENFOR_MAALGRUPPE) {
            const tiltakNokler: TiltakId[] = this.utledTiltak(brukertype);
            doSettTiltak(tiltakNokler[0], tiltakNokler[1]);
        } else if (maalId !== MaalOption.IKKE_VALGT) {
            const tiltakNokler: TiltakId[] = tiltakMap[maalId];
            doSettTiltak(tiltakNokler[0], tiltakNokler[1]);
        } else if (brukertype === BrukerType.SYKMELDT_MED_ARBEIDSGIVER && maalFraRegistrering !== MaalFraRegistrering.IKKE_VALGT) {
            doSettMaalId(mapTilMaalOption(maalFraRegistrering));
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
    maalId: state.maal.id,
    maalFraRegistrering: state.registrering.maalFraRegistrering,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettTiltak: (tiltakEn, tiltakTo) => dispatch(tiltakDuck.actionCreator({
        nokkelEn: tiltakEn,
        nokkelTo: tiltakTo
    })),
    doSettBruker: (brukerType: BrukerType) => dispatch(brukertypeDuck.actionCreator({brukerType})),
    doSettMaalId: (id) => dispatch(maalDuck.actionCreator({id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(BrukertypeTiltakProvider);
