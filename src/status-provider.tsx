import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { hentStatus } from './oppfolging/status-duck';
import { AppState } from './redux/reducer';
import Datalaster, { DataElement } from './api/datalaster';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    status: DataElement;
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
        return (
            <Datalaster avhengigheter={[this.props.status]}>
                {this.props.children}
            </Datalaster>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentStatus: () => hentStatus()(dispatch),
});

const mapStateToProps = (state: AppState): StateProps => ({
    status: state.status,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusProvider);
