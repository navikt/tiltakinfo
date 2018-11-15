import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import FlereTiltak from './flere-tiltak';
import Tiltak from './tiltak-container';
import KontakteNAV from './kontakte-nav';
import IngressUtenArbeidsgiver from './ingress-utenarbeidsgiver';
import { ArbeidsledigSituasjonState } from '../brukerdata/servicekode-duck';
import { MaalOption, SituasjonOption } from './tiltak-map';
import StartsideBanner from './startside-banner';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';
import AlertStripe from 'nav-frontend-alertstriper';
import Tekst from '../finn-tekst';
import IngressMedArbeidsgiver from './ingress-hararbeidsgiver';

interface StateProps {
    maalId: MaalOption;
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
    syfoSituasjon: SyfoSituasjonState;
}

type StartsideProps = StateProps;

class Startside extends React.Component<StartsideProps> {

    constructor(props: StartsideProps) {
        super(props);
    }

    render() {
        const { maalId, arbeidsledigSituasjon, syfoSituasjon } = this.props;

        const sykmeldtMedArbeidsgiver =
            syfoSituasjon.erSykmeldt
            && syfoSituasjon.harArbeidsgiver;
        const sykmeldtUtenArbeidsgiver =
            syfoSituasjon.erSykmeldt && !syfoSituasjon.harArbeidsgiver;
        const sykmeldt = sykmeldtMedArbeidsgiver || sykmeldtUtenArbeidsgiver;

        const arbeidsledig =
            (arbeidsledigSituasjon.situasjon === SituasjonOption.SITUASJONSBESTEMT)
            || (arbeidsledigSituasjon.situasjon === SituasjonOption.SPESIELT_TILPASSET);
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
                                arbeidsledigSituasjon={arbeidsledigSituasjon.situasjon}
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
    arbeidsledigSituasjon: state.arbeidsledigSituasjon,
    syfoSituasjon: state.syfoSituasjon,
});

export default connect(mapStateToProps)(Startside);