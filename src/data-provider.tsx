import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { tiltakinfoHentsykmeldinger, UnleashState } from './unleash/unleash-duck';
import { hentOppfolging } from './brukerdata/oppfolging-duck';
import { hentSykmeldinger, ikkeHentSykmeldingerOK } from './brukerdata/sykmeldinger-duck';
import { featureErAktivert } from './unleash/feature';
import { AppState } from './redux/reducer';
import { hentArbeidsledig } from './brukerdata/arbeidsledig-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    features: UnleashState;
}

interface DispatchProps {
    doHentOppfolging: () => void;
    doHentSykmeldinger: () => void;
    doHentArbeidsledig: () => void;
    dispatchOKIkkeHentSykmeldinger: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps & StateProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentOppfolging();
        this.props.doHentArbeidsledig();
        if (featureErAktivert(tiltakinfoHentsykmeldinger, this.props.features)) {
            this.props.doHentSykmeldinger();
        } else {
            this.props.dispatchOKIkkeHentSykmeldinger();
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
    dispatchOKIkkeHentSykmeldinger: () => {
        dispatch(ikkeHentSykmeldingerOK());
    },
    doHentArbeidsledig: () => hentArbeidsledig()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
