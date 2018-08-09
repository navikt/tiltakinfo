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
import { SykmeldingerState } from '../sykmeldinger/sykmeldinger-duck';
import { MAAL_OPTION } from './maal-tiltak-map';
import Datalaster from '../api/datalaster';

interface StateProps {
    sykmeldinger: SykmeldingerState;
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
        const {sykmeldinger, maalId} = this.props;
        return (
            <>
                <Brodsmuler/>
                <Datalaster avhengigheter={[sykmeldinger]}>
                    <>
                        <Tittel/>
                        <Ingress/>
                        {(!sykmeldinger.data.harArbeidsgiver || maalId !== MAAL_OPTION.IKKE_VALGT) && (
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
    sykmeldinger: state.sykmeldinger,
    maalId: state.maal.id,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Startside);
