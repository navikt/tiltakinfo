import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { UnleashState } from './unleash/unleash-duck';
import Startside from './startside/startside';
import { AppState } from './redux/reducer';
import { connect } from 'react-redux';

export const URL_ADMIN = '/admin';

interface StateProps {
    features: UnleashState;
}

type InnholdProps = StateProps & RouteComponentProps<any>; // tslint:disable-line:no-any

class Innhold extends React.Component<InnholdProps> {
    constructor(props: InnholdProps) {
        super(props);
    }

    render() {
        return (
            <main className="maincontent">
                <Switch location={this.props.location}>
                    <Route path={URL_ADMIN} component={Startside}/>
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
    features: state.unleash,
});

export default withRouter(connect(mapStateToProps)(Innhold));
