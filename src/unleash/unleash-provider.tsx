import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../types';
import { hentUnleash, TiltakInfoToggles } from './unleash-duck';
import { AppState } from '../redux/reducer';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    toggles: TiltakInfoToggles;
}

interface DispatchProps {
    doHentUnleash: () => void;
}

type UnleashProviderProps = OwnProps & StateProps & DispatchProps;

class UnleashProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }
    componentDidMount() {
        this.props.doHentUnleash();
    }
    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    toggles: state.unleash.tiltakinfo,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentUnleash: () => hentUnleash()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnleashProvider);
