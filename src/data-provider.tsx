import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { hentOppfolging, OppfolgingState } from './brukerdata/oppfolging-duck';
import { AppState } from './redux/reducer';
import { ArbeidsledigSituasjonState, hentArbeidsledig } from './brukerdata/servicekode-duck';
import { hentSyfo, SyfoSituasjonState } from './brukerdata/syfo-duck';
import Datalaster from './api/datalaster';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    arbeidsledigSituasjon: ArbeidsledigSituasjonState;
    syfoSituasjon: SyfoSituasjonState;
    oppfolging: OppfolgingState;
}

interface DispatchProps {
    doHentOppfolging: () => void;
    doHentArbeidsledig: () => void;
    doHentSyfo: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps & StateProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentOppfolging();
        this.props.doHentArbeidsledig();
        this.props.doHentSyfo();
    }

    render() {
        const {arbeidsledigSituasjon, syfoSituasjon, oppfolging} = this.props;
        return (
            <Datalaster avhengigheter={[arbeidsledigSituasjon, syfoSituasjon, oppfolging]}>
                {this.props.children}
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    arbeidsledigSituasjon: state.arbeidsledigSituasjon,
    syfoSituasjon: state.syfoSituasjon,
    oppfolging: state.oppfolging,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentOppfolging: () => hentOppfolging()(dispatch),
    doHentArbeidsledig: () => hentArbeidsledig()(dispatch),
    doHentSyfo: () => hentSyfo()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
