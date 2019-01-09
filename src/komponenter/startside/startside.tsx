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
import { featureErAktivert } from '../../unleash/feature';
import { AppState } from '../../redux/reducer';
import { SyfoSituasjonState } from '../../brukerdata/syfo-duck';
import { MaalOption, SituasjonOption, tiltakMap } from '../tiltak/tiltak-map';
import IngressMedArbeidsgiver from '../ingress/ingress-hararbeidsgiver';
import IngressUtenArbeidsgiver from '../ingress/ingress-utenarbeidsgiver';
import { tiltakInfoMeldingBaerum, UnleashState } from '../../unleash/unleash-duck';
import { MaalFraRegistrering, RegistreringState } from '../../brukerdata/registrering-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import './startside.less';
import { TiltakId } from '../tiltak/tiltak-config';
import { BrukerType, maalDuck, tiltakDuck } from '../../redux/generic-reducers';
import HarSendtMelding from '../kontakte-nav/har-sendt-melding';

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
    features: UnleashState;
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
        const { maalId } = this.props;

        if (maalId !== prevProps.maalId) {
            this.utledOgSettTiltak(maalId);
        }
    }

    utledOgSettTiltak(maalId: MaalOption) {
        const tiltakNokler: TiltakId[] = tiltakMap[maalId];
        this.props.doSettTiltak(tiltakNokler[0], tiltakNokler[1]);
    }

    render() {
        const {maalId, oppfolgingsEnhet, harSendtMelding, sykmeldtMedArbeidsgiver, sykmeldtUtenArbeidsgiver,
            arbeidsledigSituasjonsbestemt, arbeidsledigSpesieltTilpasset, features} = this.props;

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
                                {(oppfolgingsEnhet.enhetId === '0219' && harSendtMelding &&
                                    featureErAktivert(tiltakInfoMeldingBaerum, features)) ? (
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
    brukerType: state.brukertype.brukerType,
    situasjon: state.oppfolgingsstatus.situasjon,
    sykmeldtMedArbeidsgiver: state.brukertype.brukerType === BrukerType.SYKMELDT_MED_ARBEIDSGIVER,
    sykmeldtUtenArbeidsgiver: state.brukertype.brukerType === BrukerType.SYKMELDT_UTEN_ARBEIDSGIVER,
    arbeidsledigSituasjonsbestemt: state.brukertype.brukerType === BrukerType.ARBEIDSLEDIG_SITUASJONSBESTEMT,
    arbeidsledigSpesieltTilpasset: state.brukertype.brukerType === BrukerType.ARBEIDSLEDIG_SPESIELT_TILPASSET,
    harSendtMelding: state.harSendtMelding.harSendtMelding,
    features: state.unleash,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettMaalId: (id) => dispatch(maalDuck.actionCreator({id})),
    doSettTiltak: (tiltakEn, tiltakTo) => dispatch(tiltakDuck.actionCreator({
        nokkelEn: tiltakEn,
        nokkelTo: tiltakTo
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);
