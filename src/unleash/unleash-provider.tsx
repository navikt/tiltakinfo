import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { hentUnleash } from './unleash-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface DispatchProps {
    doHentUnleash: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps;

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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentUnleash: () => hentUnleash()(dispatch),
});

export default connect(null, mapDispatchToProps)(UnleashProvider);
