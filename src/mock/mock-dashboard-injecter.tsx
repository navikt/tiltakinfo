import * as React from 'react';
import MockDashboard from './mock-dashboard';
import { erDemo } from './utils';
import { Bruker } from './mock-data-config';
import { AppState } from '../redux/reducer';
import { connect } from 'react-redux';

interface StateProps {
    demobruker: Bruker;
}

export default function mockDashboardInjecter(WrappedComponent: React.ComponentClass) {

    class Dashboard extends React.Component<StateProps> {

        render() {
            const {demobruker} = this.props;
            return (
                <>
                    {erDemo() && <MockDashboard/>}
                    {!(erDemo() && demobruker === Bruker.DEFAULT_MOCK) && <WrappedComponent/>}
                </>
            );
        }
    }

    const mapStateToProps = (state: AppState): StateProps => ({
        demobruker: state.demobruker.id,
    });

    return connect(mapStateToProps)(Dashboard);
}