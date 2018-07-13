import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { tiltakinfoHentarbeidsforhold, UnleashState } from './unleash/unleash-duck';
import { hentOppfolging } from './oppfolging/oppfolging-duck';
import { hentArbeidsforhold, hentArbeidsforholdOK } from './arbeidsforhold/arbeidsforhold-duck';
import { featureErAktivert } from './unleash/feature';
import { AppState } from './redux/reducer';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    features: UnleashState;
}

interface DispatchProps {
    doHentOppfolging: () => void;
    doHentArbeidsforhold: () => void;
    dispatchOKIngenArbeidsgiver: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps & StateProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentOppfolging();
        if (featureErAktivert(tiltakinfoHentarbeidsforhold, this.props.features)) {
            this.props.doHentArbeidsforhold();
        } else {
            this.props.dispatchOKIngenArbeidsgiver();
        }
    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    features: state.unleash,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentOppfolging: () => hentOppfolging()(dispatch),
    doHentArbeidsforhold: () => hentArbeidsforhold()(dispatch),
    dispatchOKIngenArbeidsgiver: () => {
        dispatch(hentArbeidsforholdOK([{arbeidsgiver: ''}]));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
