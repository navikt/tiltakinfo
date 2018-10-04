import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { UnleashState } from './unleash/unleash-duck';
import { hentOppfolging } from './brukerdata/oppfolging-duck';
import { AppState } from './redux/reducer';
import { hentArbeidsledig } from './brukerdata/servicekode-duck';
import { hentSyfo } from './brukerdata/syfo-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    features: UnleashState;
}

interface DispatchProps {
    doHentOppfolging: () => void;
    doHentArbeidsledig: () => void;
    doHentSyfo: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps & StateProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentOppfolging();
        this.props.doHentArbeidsledig();
        this.props.doHentSyfo();
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
    doHentArbeidsledig: () => hentArbeidsledig()(dispatch),
    doHentSyfo: () => hentSyfo()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
