import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from './redux/dispatch-type';
import { hentUnleash } from './unleash/unleash-duck';
import { hentOppfolging } from './oppfolging/oppfolging-duck';
import { hentArbeidsforhold } from './arbeidsforhold/arbeidsforhold-duck';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface DispatchProps {
    doHentUnleash: () => void;
    doHentOppfolging: () => void;
    doHentArbeidsforhold: () => void;
}

type UnleashProviderProps = OwnProps & DispatchProps;

class DataProvider extends React.Component<UnleashProviderProps> {
    constructor(props: UnleashProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.doHentUnleash();
        this.props.doHentOppfolging();
        this.props.doHentArbeidsforhold();
    }

    render() {
        return this.props.children;
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doHentUnleash: () => hentUnleash()(dispatch),
    doHentOppfolging: () => hentOppfolging()(dispatch),
    doHentArbeidsforhold: () => hentArbeidsforhold()(dispatch),
});

export default connect(null, mapDispatchToProps)(DataProvider);
