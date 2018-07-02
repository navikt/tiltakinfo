import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { hentUnleash } from './unleash/unleash-duck';
import { hentOppfolging } from './oppfolging/oppfolging-duck';
import { AppState } from './redux/reducer';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface DispatchProps {
    doHentUnleash: () => void;
    doHentOppfolging: () => void;
}

interface StateProps {
    harGyldigOidcToken: boolean;
}

type UnleashProviderProps = OwnProps & StateProps & DispatchProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.harGyldigOidcToken) {
            location.href = '/veilarbstepup/oidc?url=/tiltakinfo';
        }
        this.props.doHentUnleash();
        this.props.doHentOppfolging();
    }

    render() {
        return this.props.children;
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentUnleash: () => hentUnleash()(dispatch),
    doHentOppfolging: () => hentOppfolging()(dispatch),
});

const mapStateToProps = (state: AppState): StateProps => ({
    harGyldigOidcToken: state.status.harGyldigOidcToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
