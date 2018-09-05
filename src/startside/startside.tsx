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
import { MaalOption } from './maal-tiltak-map';
import Datalaster from '../api/datalaster';

interface StateProps {
    sykmeldinger: SykmeldingerState;
    maalId: MaalOption;
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
                <Tittel/>
                <div className="app-content">
                    <Brodsmuler/>
                    <Datalaster avhengigheter={[sykmeldinger]}>
                        <>
                            <Ingress/>
                            {(!sykmeldinger.data.harArbeidsgiver || maalId !== MaalOption.IKKE_VALGT) && (
                                <>
                                    <Tiltak/>
                                    <KontakteNAV/>
                                    <FlereTiltak/>
                                </>
                            )}
                        </>
                    </Datalaster>
                </div>
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
