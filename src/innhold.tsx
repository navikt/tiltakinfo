import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import Startside from './startside/startside';
import { tiltakinfoMvp } from './unleash/unleash-duck';
import Feature from './unleash/feature';

type InnholdProps = RouteComponentProps<any>; // tslint:disable-line:no-any

class Innhold extends React.Component<InnholdProps> {
    constructor(props: InnholdProps) {
        super(props);
    }

    render() {
        return (
            <Feature name={tiltakinfoMvp}>
                <main className="maincontent">
                    <Switch location={this.props.history.location}>
                        <Route
                            exact={true}
                            path="/"
                            component={Startside}
                        />
                    </Switch>
                </main>
            </Feature>
        );
    }
}

export default withRouter(Innhold);
