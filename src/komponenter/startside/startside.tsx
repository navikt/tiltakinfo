import * as React from 'react';
import { connect } from 'react-redux';
import AlertStripe from 'nav-frontend-alertstriper';
import Tekst from '../../finn-tekst';
import FlereTiltak from '../flere-tiltak';
import Tiltak from '../tiltak/tiltak-container';
import StartsideBanner from './startside-banner';
import { Dispatch } from '../../redux/dispatch-type';
import KontakteNAV from '../kontakte-nav/kontakte-nav';
import { featureErAktivert } from '../../unleash/feature';
import { AppState } from '../../redux/reducer';
import { BrukerType, MaalOption, tiltakMap } from '../tiltak/tiltak-map';
import IngressMedArbeidsgiver from '../ingress/ingress-hararbeidsgiver';
import IngressUtenArbeidsgiver from '../ingress/ingress-utenarbeidsgiver';
import { tiltakInfoMeldingBaerum, UnleashState } from '../../unleash/unleash-duck';
import { OppfolgingsEnhet } from '../../brukerdata/oppfolgingsstatus-duck';
import './startside.less';
import { TiltakId } from '../tiltak/tiltak-config';
import { tiltakDuck } from '../../redux/generic-reducers';
import HarSendtMelding from '../kontakte-nav/har-sendt-melding';
import PanelBase from 'nav-frontend-paneler';

interface StateProps {
    maalId: MaalOption;
    oppfolgingsEnhet: OppfolgingsEnhet;
    harSendtMelding: boolean;
    sykmeldtMedArbeidsgiver: boolean;
    sykmeldtUtenArbeidsgiver: boolean;
    arbeidsledigSituasjonsbestemt: boolean;
    arbeidsledigSpesieltTilpasset: boolean;
    features: UnleashState;
}

interface DispatchProps {
    doSettTiltak: (tiltakEn: string, tiltakTo: string) => void;
}

type StartsideProps = StateProps & DispatchProps;

class Startside extends React.Component<StartsideProps> {
    constructor(props: StartsideProps) {
        super(props);
    }

    componentDidUpdate(prevProps: Readonly<StartsideProps>) {
        const {maalId} = this.props;

        if (maalId !== prevProps.maalId) {
            this.utledOgSettTiltak(maalId);
        }
    }

    utledOgSettTiltak(maalId: MaalOption) {
        const tiltakNokler: TiltakId[] = tiltakMap[maalId];
        this.props.doSettTiltak(tiltakNokler[0], tiltakNokler[1]);
    }

    render() {
        const {
            maalId, oppfolgingsEnhet, harSendtMelding, sykmeldtMedArbeidsgiver, sykmeldtUtenArbeidsgiver,
            arbeidsledigSituasjonsbestemt, arbeidsledigSpesieltTilpasset, features
        } = this.props;

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
                        <section className="ingress-container">
                            <div className="limit">
                                <IngressKomponent/>
                            </div>
                        </section>

                        {((sykmeldtMedArbeidsgiver && maalId !== MaalOption.IKKE_VALGT)
                            || sykmeldtUtenArbeidsgiver
                            || arbeidsledig) &&
                        <>
                            <section className="tiltak-container">
                                <div className="limit">
                                    <Tiltak/>
                                </div>
                            </section>

                            <section className="kontakte-nav-container">
                                <div className="limit">
                                    {
                                        (oppfolgingsEnhet.enhetId === '0219' && harSendtMelding &&
                                            featureErAktivert(tiltakInfoMeldingBaerum, features)) ? (
                                            <PanelBase border={true} className="har-sendt-melding">
                                                <HarSendtMelding/>
                                            </PanelBase>
                                        ) : (
                                            <KontakteNAV/>
                                        )}
                                </div>
                            </section>
                        </>
                        }
                    </>
                    :
                    <div className="feilmelding limit">
                        <AlertStripe type="advarsel">
                            <Tekst id={'feilmelding-manglendeinfo'}/>
                        </AlertStripe>
                    </div>
                }

                {!(sykmeldtMedArbeidsgiver && maalId === MaalOption.IKKE_VALGT) &&
                <section className="flere-tiltak-container">
                    <div className="limit">
                        <FlereTiltak/>
                    </div>
                </section>
                }
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    maalId: state.maal.id,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
    sykmeldtMedArbeidsgiver: state.brukertype.brukerType === BrukerType.SYKMELDT_MED_ARBEIDSGIVER,
    sykmeldtUtenArbeidsgiver: state.brukertype.brukerType === BrukerType.SYKMELDT_UTEN_ARBEIDSGIVER,
    arbeidsledigSituasjonsbestemt: state.brukertype.brukerType === BrukerType.ARBEIDSLEDIG_SITUASJONSBESTEMT,
    arbeidsledigSpesieltTilpasset: state.brukertype.brukerType === BrukerType.ARBEIDSLEDIG_SPESIELT_TILPASSET,
    harSendtMelding: state.harSendtMelding.harSendtMelding,
    features: state.unleash,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettTiltak: (tiltakEn, tiltakTo) => dispatch(tiltakDuck.actionCreator({
        nokkelEn: tiltakEn,
        nokkelTo: tiltakTo
    })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);
