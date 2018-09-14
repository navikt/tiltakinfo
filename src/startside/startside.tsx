import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import Brodsmuler from './brodsmuler';
import FlereTiltak from './flere-tiltak';
import Tiltak from './tiltak-container';
import KontakteNAV from './kontakte-nav';
import IngressSykmeldtUtenArbeidsgiver from './ingress-sykmeldtutenarbeidsgiver';
import { SykmeldingerState } from '../brukerdata/sykmeldinger-duck';
import { ArbeidsledigState } from '../brukerdata/arbeidsledig-duck';
import { MaalOption, SituasjonOption } from './tiltak-map';
import Datalaster from '../api/datalaster';
import StartsideBanner from './startside-banner';
import IngressSykmeldtMedArbeidsgiver from './ingress-sykmeldtmedarbeidsgiver';

interface StateProps {
    sykmeldinger: SykmeldingerState;
    maalId: MaalOption;
    arbeidsledig: ArbeidsledigState;
}

interface DispatchProps {
}

type StartsideProps = DispatchProps & StateProps;

class Startside extends React.Component<StartsideProps> {

    constructor(props: StartsideProps) {
        super(props);
    }

    render() {
        const {sykmeldinger, maalId, arbeidsledig} = this.props;
        const IngressKomponent = sykmeldinger.data.harArbeidsgiver
            ? IngressSykmeldtMedArbeidsgiver
            : IngressSykmeldtUtenArbeidsgiver;
        return (
            <>
                <StartsideBanner/>
                <section className="app-content brodsmuler-container">
                    <Brodsmuler/>
                </section>
                <Datalaster avhengigheter={[sykmeldinger, arbeidsledig]}>
                    <>
                        <section className="app-content ingress-container">
                            <IngressKomponent/>
                        </section>
                        {(
                            ((arbeidsledig.situasjon !== SituasjonOption.SYKMELDT)
                            && (arbeidsledig.situasjon !== SituasjonOption.UBESTEMT))
                            || !sykmeldinger.data.harArbeidsgiver
                            || maalId !== MaalOption.IKKE_VALGT) && (
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
                        )}
                    </>
                </Datalaster>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldinger: state.sykmeldinger,
    maalId: state.maal.id,
    arbeidsledig: state.arbeidsledig,
});

export default connect(mapStateToProps)(Startside);