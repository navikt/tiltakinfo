import * as React from 'react';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import Tekst from '../../finn-tekst';
import FlereTiltak from '../flere-tiltak';
import Tiltak from '../tiltak/tiltak-container';
import StartsideBanner from './startside-banner';
import { mapTilMaalOption } from '../../mock/utils';
import { Dispatch } from '../../redux/dispatch-type';
import KontakteNAV from '../kontakte-nav/kontakte-nav';
import { AppState } from '../../redux/reducer';
import { SyfoSituasjonState } from '../../brukerdata/syfo-duck';
import { MaalOption, SituasjonOption, tiltakMap } from '../tiltak/tiltak-map';
import IngressMedArbeidsgiver from '../ingress/ingress-hararbeidsgiver';
import IngressUtenArbeidsgiver from '../ingress/ingress-utenarbeidsgiver';
import { MaalFraRegistrering, RegistreringState } from '../../brukerdata/registrering-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import './startside.less';
import HarSendtMelding from './har-sendt-melding';
import { BrukerType, maalDuck, tiltakDuck } from '../../redux/generic-reducers';
import { TiltakId } from '../tiltak/tiltak-config';

interface StateProps {
    maalId: MaalOption;
    syfoSituasjon: SyfoSituasjonState;
    registrering: RegistreringState;
    oppfolgingsEnhet: OppfolgingsEnhet;
    harSendtMelding: boolean;
    brukerType: BrukerType;
    situasjon: SituasjonOption;
    sykmeldtMedArbeidsgiver: boolean;
    sykmeldtUtenArbeidsgiver: boolean;
    arbeidsledigSituasjonsbestemt: boolean;
    arbeidsledigSpesieltTilpasset: boolean;
}

interface DispatchProps {
    doSettMaalId: (id: MaalOption) => void;
    doSettTiltak: (tiltakEn: string, tiltakTo: string) => void;
}

type StartsideProps = StateProps & DispatchProps;

class Startside extends React.Component<StartsideProps> {

    constructor(props: StartsideProps) {
        super(props);
    }

    componentDidMount() {
        const {maalId, registrering, doSettMaalId, syfoSituasjon} = this.props;

        if (maalId === MaalOption.IKKE_VALGT && registrering.maalFraRegistrering !== MaalFraRegistrering.IKKE_VALGT
            && syfoSituasjon.erSykmeldt && syfoSituasjon.harArbeidsgiver) {
            const fremtidigSituasjon = registrering.maalFraRegistrering;
            doSettMaalId(mapTilMaalOption(fremtidigSituasjon));
        }
    }

    componentDidUpdate(prevProps: Readonly<StartsideProps>) {
        const { brukerType, maalId, situasjon, sykmeldtMedArbeidsgiver, sykmeldtUtenArbeidsgiver, doSettTiltak } = this.props;
        if (brukerType !== prevProps.brukerType || maalId !== prevProps.maalId) {

            const sykmeldt = sykmeldtMedArbeidsgiver || sykmeldtUtenArbeidsgiver;

            const finnTiltakMapKey = (): string => {
                if (sykmeldt) {
                    if (sykmeldtMedArbeidsgiver) {
                        return maalId;
                    } else {
                        return SituasjonOption.SYKMELDT_UTEN_ARBEIDSGIVER;
                    }
                } else {
                    return situasjon;
                }

            };
            const tiltakNokler: TiltakId[] = tiltakMap[finnTiltakMapKey()];
            doSettTiltak(tiltakNokler[0], tiltakNokler[1]);
        }

    }

    render() {
        const {maalId, oppfolgingsEnhet, harSendtMelding, sykmeldtMedArbeidsgiver, sykmeldtUtenArbeidsgiver,
            arbeidsledigSituasjonsbestemt, arbeidsledigSpesieltTilpasset} = this.props;

        const sykmeldt = sykmeldtMedArbeidsgiver || sykmeldtUtenArbeidsgiver;

        const arbeidsledig = arbeidsledigSituasjonsbestemt || arbeidsledigSpesieltTilpasset;

        const IngressKomponent = sykmeldtMedArbeidsgiver ? IngressMedArbeidsgiver : IngressUtenArbeidsgiver;

        const gyldigBrukerSituasjon = arbeidsledig || sykmeldt;

        return (
            <>
                <StartsideBanner
                    sykmeldt={sykmeldt}
                    arbeidsledig={arbeidsledig && !sykmeldt}
                    sykmeldtMedArbeidsgiver={sykmeldtMedArbeidsgiver}
                />
                {gyldigBrukerSituasjon ?
                    <>
                        <section className="app-content ingress-container">
                            <IngressKomponent/>
                        </section>

                        {((sykmeldtMedArbeidsgiver && maalId !== MaalOption.IKKE_VALGT)
                            || sykmeldtUtenArbeidsgiver
                            || arbeidsledig) &&
                        <>
                            <section className="app-content tiltak-container">
                                <Tiltak/>
                            </section>

                            <section className="app-content kontakte-nav-container blokk-xl">
                                {(oppfolgingsEnhet.enhetId === '0219' && harSendtMelding) ? (
                                    <HarSendtMelding/>
                                ) : (
                                    <KontakteNAV/>
                                )}
                            </section>
                        </>
                        }
                    </>
                    :
                    <div className="app-content alert">
                        <AlertStripe type="advarsel" className="feilmelding-container">
                            <Tekst id={'feilmelding-manglendeinfo'}/>
                        </AlertStripe>
                    </div>
                }

                {!(sykmeldtMedArbeidsgiver && maalId === MaalOption.IKKE_VALGT) &&
                <section className="app-content flere-tiltak-container">
                    <FlereTiltak/>
                </section>
                }
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    maalId: state.maal.id,
    syfoSituasjon: state.syfoSituasjon,
    registrering: state.registrering,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
    harSendtMelding: false,
    brukerType: state.bruker.brukerType,
    situasjon: state.oppfolgingsstatus.situasjon,
    sykmeldtMedArbeidsgiver: state.bruker.brukerType === BrukerType.SYKMELDT_MED_ARBEIDSGIVER,
    sykmeldtUtenArbeidsgiver: state.bruker.brukerType === BrukerType.SYKMELDT_UTEN_ARBEIDSGIVER,
    arbeidsledigSituasjonsbestemt: state.bruker.brukerType === BrukerType.ARBEIDSLEDIG_SITUASJONSBESTEMT,
    arbeidsledigSpesieltTilpasset: state.bruker.brukerType === BrukerType.ARBEIDSLEDIG_SPESIELT_TILPASSET,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettMaalId: (id) => dispatch(maalDuck.actionCreator({id})),
    doSettTiltak: (tiltakEn, tiltakTo) => dispatch(tiltakDuck.actionCreator({
        nokkelEn: tiltakEn,
        nokkelTo: tiltakTo
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);
