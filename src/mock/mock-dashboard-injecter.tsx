import * as React from 'react';
import MockDashboard from './mock-dashboard';
import { erDemo } from './utils';

export default function mockDashboardInjecter(WrappedComponent: React.ComponentClass) {
    return class extends React.Component {
        render() {
            return (
                <>
                    {erDemo() && <MockDashboard/>}
                    <WrappedComponent/>
                </>
            );
        }
    };
}