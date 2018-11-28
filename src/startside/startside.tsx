import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, maalDuck } from '../redux/reducer';
import FlereTiltak from './flere-tiltak';
import Tiltak from './tiltak-container';
import KontakteNAV from './kontakte-nav';
import IngressUtenArbeidsgiver from './ingress-utenarbeidsgiver';
import { OppfolgingsstatusState } from '../brukerdata/oppfolgingsstatus-duck';
import { MaalOption, SituasjonOption } from './tiltak-map';
import StartsideBanner from './startside-banner';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import AlertStripe from 'nav-frontend-alertstriper';
import Tekst from '../finn-tekst';
import IngressMedArbeidsgiver from './ingress-hararbeidsgiver';
import { RegistreringState } from '../brukerdata/registrering-duck';
import { Dispatch } from '../redux/dispatch-type';
import { mapTilMaalOption } from '../mock/utils';

interface StateProps {
    maalId: MaalOption;
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    registrering: RegistreringState;
}

interface DispatchProps {
    doSettMaalId: (id: MaalOption) => void;
}

type StartsideProps = StateProps & DispatchProps;

class Startside extends React.Component<StartsideProps> {

    constructor(props: StartsideProps) {
        super(props);
    }

    componentWillMount() {
        const { maalId, registrering, doSettMaalId } = this.props;

        if (maalId === MaalOption.IKKE_VALGT && registrering.registreringData) {
            const fremtidigSituasjon = registrering.registreringData.registrering.besvarelse.fremtidigSituasjon;
            doSettMaalId(mapTilMaalOption(fremtidigSituasjon));
        }
    }

    render() {
        const { maalId, oppfolgingsstatus, syfoSituasjon } = this.props;

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
                { gyldigBrukerSituasjon() ?
                <>
                    <section className="app-content ingress-container">
                        <IngressKomponent/>
                    </section>
                    { ((sykmeldtMedArbeidsgiver && maalId !== MaalOption.IKKE_VALGT)
                    || sykmeldtUtenArbeidsgiver
                    || arbeidsledig ) &&
                    <>
                        <section className="app-content tiltak-container">
                            <Tiltak
                                tiltakErBasertPaMaal={sykmeldtMedArbeidsgiver}
                                sykmeldt={sykmeldt}
                                sykmeldtMedArbeidsgiver={sykmeldtMedArbeidsgiver}
                                oppfolgingsstatus={oppfolgingsstatus.situasjon}
                            />
                        </section>
                        <section className="app-content-kontakte-nav blokk-xl">
                            <KontakteNAV/>
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
                { !(sykmeldtMedArbeidsgiver && maalId === MaalOption.IKKE_VALGT) &&
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
    registrering: state.registrering
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettMaalId: (id) => dispatch(maalDuck.actionCreator({id})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);