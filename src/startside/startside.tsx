import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import Brodsmuler from './brodsmuler';
import FlereTiltak from './flere-tiltak';
import Tiltak from './tiltak-container';
import KontakteNAV from './kontakte-nav';
import IngressSykmeldtUtenArbeidsgiver from './ingress-sykmeldtutenarbeidsgiver';
import { SykmeldingerState } from '../brukerdata/sykmeldinger-duck';
import { ArbeidsledigSituasjonState } from '../brukerdata/servicekode-duck';
import { MaalOption, SituasjonOption } from './tiltak-map';
import Datalaster from '../api/datalaster';
import StartsideBanner from './startside-banner';
import IngressSykmeldtMedArbeidsgiver from './ingress-sykmeldtmedarbeidsgiver';

interface StateProps {
    sykmeldinger: SykmeldingerState;
    maalId: MaalOption;
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
}

interface DispatchProps {
}

type StartsideProps = DispatchProps & StateProps;

class Startside extends React.Component<StartsideProps> {

    constructor(props: StartsideProps) {
        super(props);
    }

    render() {
        const {sykmeldinger, maalId, arbeidsledigSituasjon} = this.props;
        const IngressKomponent = sykmeldinger.data.harArbeidsgiver
            ? IngressSykmeldtMedArbeidsgiver
            : IngressSykmeldtUtenArbeidsgiver;
        const gyldigTiltakSituasjon = () => {
            const arbeidsledig =
                (arbeidsledigSituasjon.situasjon === SituasjonOption.SITUASJONSBESTEMT)
                || (arbeidsledigSituasjon.situasjon === SituasjonOption.SPESIELT_TILPASSET);
            const sykmeldtUtenArbeidsgiver =
                sykmeldinger.data.erSykmeldt && !sykmeldinger.data.harArbeidsgiver;
            const sykmeldtMedArbeidsgiver =
                sykmeldinger.data.erSykmeldt
                && sykmeldinger.data.harArbeidsgiver
                && (maalId !== MaalOption.IKKE_VALGT);
            return (arbeidsledig || sykmeldtUtenArbeidsgiver || sykmeldtMedArbeidsgiver);
        };

        return (
            <>
                <StartsideBanner/>
                <section className="app-content brodsmuler-container">
                    <Brodsmuler/>
                </section>
                <Datalaster avhengigheter={[sykmeldinger, arbeidsledigSituasjon]}>
                    <>
                        <section className="app-content ingress-container">
                            <IngressKomponent/>
                        </section>
                        {(
                            gyldigTiltakSituasjon() && (
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
    sykmeldinger: state.sykmeldinger,
    maalId: state.maal.id,
    arbeidsledigSituasjon: state.arbeidsledigSituasjon,
});

export default connect(mapStateToProps)(Startside);