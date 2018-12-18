import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, maalDuck } from '../../redux/reducer';
import FlereTiltak from '../flere-tiltak';
import Tiltak from '../tiltak/tiltak-container';
import KontakteNAV from '../kontakte-nav/kontakte-nav';
import IngressUtenArbeidsgiver from '../ingress/ingress-utenarbeidsgiver';
import { OppfolgingsEnhet, OppfolgingsstatusState } from '../../brukerdata/oppfolgingsstatus-duck';
import { MaalOption, SituasjonOption } from '../tiltak/tiltak-map';
import StartsideBanner from './startside-banner';
import { SyfoSituasjonState } from '../../brukerdata/syfo-duck';
import AlertStripe from 'nav-frontend-alertstriper';
import Tekst from '../../finn-tekst';
import IngressMedArbeidsgiver from '../ingress/ingress-hararbeidsgiver';
import { MaalFraRegistrering, RegistreringState } from '../../brukerdata/registrering-duck';
import { Dispatch } from '../../redux/dispatch-type';
import { mapTilMaalOption } from '../../mock/utils';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { OppfolgingState } from '../../brukerdata/oppfolging-duck';

const velgMaalBilde = require('../../ikoner/check_blaa.svg');
import './startside.less';

interface StateProps {
    maalId: MaalOption;
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    registrering: RegistreringState;
    oppfolging: OppfolgingState;
    oppfolgingsEnhet: OppfolgingsEnhet;
    harSendtMelding: boolean;
}

interface DispatchProps {
    doSettMaalId: (id: MaalOption) => void;
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

    render() {
        const {maalId, oppfolgingsstatus, syfoSituasjon, oppfolging, oppfolgingsEnhet, harSendtMelding} = this.props;

        const sykmeldtMedArbeidsgiver =
            syfoSituasjon.erSykmeldt
            && syfoSituasjon.harArbeidsgiver;
        const sykmeldtUtenArbeidsgiver =
            syfoSituasjon.erSykmeldt && !syfoSituasjon.harArbeidsgiver;
        const sykmeldt = sykmeldtMedArbeidsgiver || sykmeldtUtenArbeidsgiver;

        const arbeidsledig =
            (oppfolgingsstatus.situasjon === SituasjonOption.SITUASJONSBESTEMT)
            || (oppfolgingsstatus.situasjon === SituasjonOption.SPESIELT_TILPASSET);
        const IngressKomponent = sykmeldtMedArbeidsgiver ? IngressMedArbeidsgiver : IngressUtenArbeidsgiver;
        const gyldigBrukerSituasjon = () => {
            return (arbeidsledig || sykmeldtUtenArbeidsgiver || sykmeldtMedArbeidsgiver);
        };

        return (
            <>
                <StartsideBanner
                    sykmeldt={sykmeldt}
                    arbeidsledig={arbeidsledig && !sykmeldt}
                    sykmeldtMedArbeidsgiver={sykmeldtMedArbeidsgiver}
                />
                {gyldigBrukerSituasjon() ?
                    <>
                        <section className="app-content ingress-container">
                            <IngressKomponent/>
                        </section>
                        {((sykmeldtMedArbeidsgiver && maalId !== MaalOption.IKKE_VALGT)
                            || sykmeldtUtenArbeidsgiver
                            || arbeidsledig) &&
                        <>
                            <section className="app-content tiltak-container">
                                <Tiltak
                                    tiltakErBasertPaMaal={sykmeldtMedArbeidsgiver}
                                    sykmeldt={sykmeldt}
                                    sykmeldtMedArbeidsgiver={sykmeldtMedArbeidsgiver}
                                    situasjon={oppfolgingsstatus.situasjon}
                                />
                            </section>
                            <section className="app-content kontakte-nav-container blokk-xl">
                                {oppfolgingsEnhet.enhetId === '0219' && !oppfolging.underOppfolging && (
                                    harSendtMelding ? (
                                        <div className="har-sendt-melding panel panel--border">
                                            <div className="har-sendt-melding__ikon">
                                                <img src={velgMaalBilde} alt=""/>
                                            </div>
                                            <Sidetittel tag="h1" className="har-sendt-melding__tittel blokk-s">
                                                NAV Bærum har fått beskjed
                                            </Sidetittel>
                                            <Normaltekst>
                                                Du har sagt ifra til NAV Bærum om at du ønsker å snakke om muligheter.
                                                De tar kontakt med deg innen et par dager.
                                            </Normaltekst>
                                        </div>
                                    ) : (
                                        <KontakteNAV/>
                                    )
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
    oppfolgingsstatus: state.oppfolgingsstatus,
    syfoSituasjon: state.syfoSituasjon,
    registrering: state.registrering,
    oppfolging: state.oppfolging,
    oppfolgingsEnhet: state.oppfolgingsstatus.oppfolgingsenhet,
    harSendtMelding: true
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettMaalId: (id) => dispatch(maalDuck.actionCreator({id})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);
