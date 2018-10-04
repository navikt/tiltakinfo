import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import Brodsmuler from './brodsmuler';
import FlereTiltak from './flere-tiltak';
import Tiltak from './tiltak-container';
import KontakteNAV from './kontakte-nav';
import IngressSykmeldtUtenArbeidsgiver from './ingress-sykmeldtutenarbeidsgiver';
import { ArbeidsledigSituasjonState } from '../brukerdata/servicekode-duck';
import { MaalOption, SituasjonOption } from './tiltak-map';
import Datalaster from '../api/datalaster';
import StartsideBanner from './startside-banner';
import IngressSykmeldtMedArbeidsgiver from './ingress-sykmeldtmedarbeidsgiver';
import { SyfoSituasjonState } from '../brukerdata/syfo-duck';

interface StateProps {
    maalId: MaalOption;
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
    syfoSituasjon: SyfoSituasjonState;
}

interface DispatchProps {
}

type StartsideProps = DispatchProps & StateProps;

class Startside extends React.Component<StartsideProps> {

    constructor(props: StartsideProps) {
        super(props);
    }

    render() {
        const { maalId, arbeidsledigSituasjon, syfoSituasjon } = this.props;
        const IngressKomponent = syfoSituasjon.harArbeidsgiver
            ? IngressSykmeldtMedArbeidsgiver
            : IngressSykmeldtUtenArbeidsgiver;
        const gyldigBrukerSituasjon = () => {
            const arbeidsledig =
                (arbeidsledigSituasjon.situasjon === SituasjonOption.SITUASJONSBESTEMT)
                || (arbeidsledigSituasjon.situasjon === SituasjonOption.SPESIELT_TILPASSET);
            const sykmeldtUtenArbeidsgiver =
                syfoSituasjon.erSykmeldt && !syfoSituasjon.harArbeidsgiver;
            const sykmeldtMedArbeidsgiver =
                syfoSituasjon.erSykmeldt
                && syfoSituasjon.harArbeidsgiver
                && (maalId !== MaalOption.IKKE_VALGT);
            return (arbeidsledig || sykmeldtUtenArbeidsgiver || sykmeldtMedArbeidsgiver);
        };

        return (
            <>
                <StartsideBanner/>
                <section className="app-content brodsmuler-container">
                    <Brodsmuler/>
                </section>
                <Datalaster avhengigheter={[arbeidsledigSituasjon, syfoSituasjon]}>
                    <>
                        <section className="app-content ingress-container">
                            <IngressKomponent/>
                        </section>
                        {(
                            gyldigBrukerSituasjon() && (
                            <>
                                <section className="app-content tiltak-container">
                                    <Tiltak/>
                                </section>

                                <section className="app-content-kontakte-nav blokk-xl">
                                    <KontakteNAV/>
                                </section>

                                <section className="app-content flere-tiltak-container">
                                    <FlereTiltak/>
                                </section>
                            </>
                        ))}
                    </>
                </Datalaster>
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