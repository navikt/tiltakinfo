import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../redux/dispatch-type';
import { AppState } from '../redux/reducer';
import { hentOppfolging } from '../oppfolging/oppfolging-duck';
import { Status } from '../redux/actions';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolgingStatus: Status;
    underOppfolging: boolean;
}

interface DispatchProps {
    doHentOppfolging: () => void;
}

type OppfolgingProviderProps = OwnProps & StateProps & DispatchProps; // tslint:disable-line

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
    underOppfolging: state.oppfolging.underOppfolging,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentOppfolging: () => hentOppfolging()(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OppfolgingProvider);