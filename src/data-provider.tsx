import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { hentUnleash } from './unleash/unleash-duck';
import { hentOppfolging } from './oppfolging/oppfolging-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface DispatchProps {
    doHentUnleash: () => void;
    doHentOppfolging: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }
    componentDidMount() {
        this.props.doHentUnleash();
        this.props.doHentOppfolging();
    }
    render() {
        return this.props.children;
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentUnleash: () => hentUnleash()(dispatch),
    doHentOppfolging: () => hentOppfolging()(dispatch),
});

export default connect(null, mapDispatchToProps)(DataProvider);
