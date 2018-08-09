import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { tiltakinfoHentsykmeldinger, UnleashState } from './unleash/unleash-duck';
import { hentOppfolging } from './oppfolging/oppfolging-duck';
import { hentSykmeldinger, hentSykmeldingerOK } from './sykmeldinger/sykmeldinger-duck';
import { featureErAktivert } from './unleash/feature';
import { AppState } from './redux/reducer';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    features: UnleashState;
}

interface DispatchProps {
    doHentOppfolging: () => void;
    doHentSykmeldinger: () => void;
    dispatchOKIngenArbeidsgiver: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps & StateProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentOppfolging();
        if (featureErAktivert(tiltakinfoHentsykmeldinger, this.props.features)) {
            this.props.doHentSykmeldinger();
        } else {
            this.props.dispatchOKIngenArbeidsgiver();
        }
    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    features: state.unleash,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentOppfolging: () => hentOppfolging()(dispatch),
    doHentSykmeldinger: () => hentSykmeldinger()(dispatch),
    dispatchOKIngenArbeidsgiver: () => {
        dispatch(hentSykmeldingerOK([{arbeidsgiver: ''}]));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
