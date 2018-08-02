import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { AppState } from '../redux/reducer';
import Brodsmuler from './brodsmuler';
import FlereTiltak from './flere-tiltak';
import Tiltak from './tiltak-komponent';
import KontakteNAV from './kontakte-nav';
import Ingress from './ingress';
import Tittel from './tittel';
import { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';
import { MAAL_OPTION } from './maal-tiltak-map';
import Datalaster from '../api/datalaster';

interface StateProps {
    arbeidsforhold: ArbeidsforholdState;
    maalId: MAAL_OPTION;
}

interface DispatchProps {
}

type StartsideProps = DispatchProps & StateProps;

class Startside extends React.Component<StartsideProps> {

    constructor(props: StartsideProps) {
        super(props);
    }

    render() {
        const {arbeidsforhold, maalId} = this.props;
        return (
            <>
                <Brodsmuler/>
                <Datalaster avhengigheter={[arbeidsforhold]}>
                    <>
                        <Tittel/>
                        <Ingress/>
                        {(!arbeidsforhold.data.harArbeidsgiver || maalId !== MAAL_OPTION.IKKE_VALGT) && (
                            <>
                                <Tiltak/>
                                <KontakteNAV/>
                                <FlereTiltak/>
                            </>
                        )}
                    </>
                </Datalaster>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsforhold: state.arbeidsforhold,
    maalId: state.maal.id,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);
