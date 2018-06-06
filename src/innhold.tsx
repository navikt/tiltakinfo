import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import Startside from './startside/startside';
import { AppState } from './ducks/reducer';

interface StateProps {
}

type InnholdProps = StateProps & RouteComponentProps<any>; // tslint:disable-line:no-any

class Innhold extends React.Component<InnholdProps> {
    constructor(props: InnholdProps) {
        super(props);
    }

    render() {
        return (
            <>
                <Switch location={this.props.history.location}>
                    <Route
                        exact={true}
                        path="/"
                        component={Startside}
                    />
                </Switch>
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    dummy: '',
});

export default withRouter(connect(mapStateToProps)(Innhold));
