import { connect } from 'react-redux';
import { AppState } from '../redux/reducer';
import * as React from 'react';
import { UnleashState } from './unleash-duck';

interface StateProps {
    features: UnleashState;
}

interface OwnProps {
    name: string;
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

type FeatureProps = StateProps & OwnProps;

export function featureErAktivert(name: string, features: UnleashState): boolean {
    return features[name] === true;
}

function Feature({ name, features, children }: FeatureProps) {
    return featureErAktivert(name, features) ? children : null;
}

const mapStateToProps = (state: AppState): StateProps => ({
    features: state.unleash,
});

export default connect(mapStateToProps)(Feature);
