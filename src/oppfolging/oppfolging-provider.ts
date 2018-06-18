import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { hentOppfolging } from './oppfolging-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface DispatchProps {
    doHentOppfolging: () => void;
}

type OppfolgingProviderProps = OwnProps & DispatchProps;

class OppfolgingProvider extends React.Component<OppfolgingProviderProps> {
    constructor(props: OppfolgingProviderProps) {
        super(props);
    }

    componentDidMount() {
            this.props.doHentOppfolging();
    }

    render() {
        return this.props.children;
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentOppfolging: () => hentOppfolging()(dispatch)
});

export default connect(null, mapDispatchToProps)(OppfolgingProvider);