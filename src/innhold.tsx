import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Startside from './komponenter/startside/startside';
import { AppState } from './redux/reducer';
import { connect } from 'react-redux';
import { OppfolgingState } from './brukerdata/oppfolging-duck';
import { SyfoSituasjonState } from './brukerdata/syfo-duck';
import { OppfolgingsstatusState } from './brukerdata/oppfolgingsstatus-duck';
import { brukerMetrikk } from './metrics';

interface StateProps {
    oppfolgingsstatus: OppfolgingsstatusState;
    syfoSituasjon: SyfoSituasjonState;
    oppfolging: OppfolgingState;
}

type InnholdProps = StateProps & RouteComponentProps<any>; // tslint:disable-line:no-any

class Innhold extends React.Component<InnholdProps> {
    constructor(props: InnholdProps) {
        super(props);
    }

    componentDidMount() {
        brukerMetrikk(
            this.props.oppfolging.servicegruppe,
            this.props.syfoSituasjon.harArbeidsgiver,
            this.props.syfoSituasjon.erSykmeldt,
            this.props.oppfolging.underOppfolging,
            this.props.oppfolgingsstatus.oppfolgingsenhet.enhetId,
            this.props.oppfolgingsstatus.oppfolgingsenhet.navn,
        );
    }

    render() {
        return (
            <Switch location={this.props.location}>
                <Route
                    path={'/'}
                    component={Startside}
                />
            </Switch>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolgingsstatus: state.oppfolgingsstatus,
    syfoSituasjon: state.syfoSituasjon,
    oppfolging: state.oppfolging,
});

export default withRouter(connect(mapStateToProps)(Innhold));
