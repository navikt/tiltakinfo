import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import Startside from './startside/startside';
import { AppState } from './redux/reducer';
import { connect } from 'react-redux';
import { OppfolgingState } from './brukerdata/oppfolging-duck';
import { SyfoSituasjonState } from './brukerdata/syfo-duck';
import { OppfolgingsstatusState } from './brukerdata/oppfolgingsstatus-duck';
import { brukerMetrikk, oppfolgingsEnhetMetrikk } from './metrics';

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
            this.props.oppfolgingsstatus.situasjon,
            this.props.syfoSituasjon.harArbeidsgiver,
            this.props.syfoSituasjon.erSykmeldt,
            this.props.oppfolging.underOppfolging
        );
        oppfolgingsEnhetMetrikk(
            this.props.oppfolgingsstatus.oppfolgingsenhet.enhetId,
        );
    }

    render() {
        return (
            <main>
                <Switch location={this.props.location}>
                    <Route
                        path={'/'}
                        component={Startside}
                    />
                </Switch>
            </main>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolgingsstatus: state.oppfolgingsstatus,
    syfoSituasjon: state.syfoSituasjon,
    oppfolging: state.oppfolging,
});

export default withRouter(connect(mapStateToProps)(Innhold));
