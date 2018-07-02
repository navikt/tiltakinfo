import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import Spinner from 'nav-frontend-spinner';
import { hentStatus, StatusState } from './oppfolging/status-duck';
import { AppState } from './redux/reducer';
import Datalaster from './api/datalaster';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    status: StatusState;
}

interface DispatchProps {
    doHentStatus: () => void;
}

type StatusProviderProps = OwnProps & StateProps & DispatchProps;

class StatusProvider extends React.Component<StatusProviderProps> {
    constructor(props: StatusProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentStatus();
    }

    render() {
        if (!this.props.status.harGyldigOidcToken) {
            location.href = '/veilarbstepup/oidc?url=/tiltakinfo';
            return (<Spinner type="XXL"/>);
        } else {
            return (
                <Datalaster avhengigheter={[this.props.status]}>
                    {this.props.children}
                </Datalaster>
            );
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentStatus: () => hentStatus()(dispatch),
});

const mapStateToProps = (state: AppState): StateProps => ({
    status: state.status,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusProvider);
