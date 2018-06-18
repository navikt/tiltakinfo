import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { AppState } from '../redux/reducer';
import { hentOppfolging } from './oppfolging-duck';
import { Status } from '../api/datalaster';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolgingStatus: Status;
}

interface DispatchProps {
    doHentOppfolging: () => void;
}

type OppfolgingProviderProps = OwnProps & StateProps & DispatchProps;

class OppfolgingProvider extends React.Component<OppfolgingProviderProps> {
    constructor(props: OppfolgingProviderProps) {
        super(props);
    }

    componentDidMount() {
            this.props.doHentOppfolging();
    }

    render() {
        if (this.props.oppfolgingStatus !== Status.OK) {
            return null;
        }
        return this.props.children;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolgingStatus: state.oppfolging.status,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentOppfolging: () => hentOppfolging()(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OppfolgingProvider);