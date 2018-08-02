import * as React from 'react';
import { Ingress as Ingresskomponent } from 'nav-frontend-typografi';
import './ingress.less';
import Tekst from '../finn-tekst';
import { AppState, maalDuck } from '../redux/reducer';
import { connect } from 'react-redux';
import { Select as SelectKomponent } from 'nav-frontend-skjema';
import { RouteComponentProps, withRouter } from 'react-router';
import { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';
import { Dispatch } from '../redux/dispatch-type';
import { MAAL_OPTIONS_REKKEFOLGE } from './maal-tiltak-map';

interface StateProps {
    harArbeidsgiver: boolean;
    arbeidsforhold: ArbeidsforholdState;
}

interface DispatchProps {
    doSettMaalId: (id: string) => void;
}

type IngressProps = StateProps & DispatchProps & RouteComponentProps<any>; // tslint:disable-line:no-any

interface IngressState {
    options: string[];
}

class Ingress extends React.Component<IngressProps, IngressState> {
    constructor(props: IngressProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        this.props.doSettMaalId(e.target.value);
    }

    render() {
        const {harArbeidsgiver} = this.props;
        const ingressId = harArbeidsgiver
            ? 'ingress-hararbeidsgiver'
            : 'ingress-utenarbeidsgiver';

        return (
            <section className="ingress">
                <Ingresskomponent>
                    <Tekst id={ingressId}/>
                </Ingresskomponent>
                {harArbeidsgiver && (
                    <SelectKomponent
                        onChange={this.handleChange}
                        label={''}
                    >
                        {MAAL_OPTIONS_REKKEFOLGE.map(tekstId => (
                                <option key={tekstId} value={tekstId}>
                                    <Tekst id={tekstId}/>
                                </option>
                            )
                        )}
                    </SelectKomponent>
                )}
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    harArbeidsgiver: state.arbeidsforhold.data.harArbeidsgiver,
    arbeidsforhold: state.arbeidsforhold,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettMaalId: (id) => dispatch(maalDuck.actionCreator({id})),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ingress));
