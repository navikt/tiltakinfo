import * as React from 'react';
import { connect } from 'react-redux';
import { StatusState } from './oppfolging/status-duck';
import { AppState } from './redux/reducer';
import Spinner from 'nav-frontend-spinner';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    status: StatusState;
}

type StepupProviderProps = OwnProps & StateProps;

class StepupProvider extends React.Component<StepupProviderProps> {
    constructor(props: StepupProviderProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.status.harGyldigOidcToken) {
            location.href = '/veilarbstepup/oidc?url=/tiltakinfo';
        }
    }

    render() {
        return !this.props.status.harGyldigOidcToken
            ? <Spinner type="XXL"/>
            : this.props.children;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    status: state.status,
});

export default connect(mapStateToProps, null)(StepupProvider);