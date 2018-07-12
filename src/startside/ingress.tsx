import * as React from 'react';
import { Ingress as Ingresskomponent } from 'nav-frontend-typografi';
import Tekst, { tekst } from '../finn-tekst';
import { AppState, maalDuck } from '../redux/reducer';
import { connect } from 'react-redux';
import { Select as SelectKomponent } from 'nav-frontend-skjema';
import { RouteComponentProps, withRouter } from 'react-router';
import { URL_ADMIN } from '../innhold';
import Datalaster from '../api/datalaster';
import { ArbeidsforholdState } from '../arbeidsforhold/arbeidsforhold-duck';
import { Dispatch } from '../redux/dispatch-type';

interface StateProps {
    harArbeidsgiver: boolean;
    arbeidsforhold: ArbeidsforholdState;
}

interface DispatchProps {
    doSettMaal: (maal: string) => void;
}

type IngressProps = StateProps & DispatchProps & RouteComponentProps<any>; // tslint:disable-line:no-any

interface IngressState {
    options: string[];
}

export class Ingress extends React.Component<IngressProps, IngressState> {
    constructor(props: IngressProps) {
        super(props);
        this.state = {
            options: [
                'ingress-maal-1',
                'ingress-maal-2',
                'ingress-maal-3',
                'ingress-maal-4',
            ],
        };
    }
    componentDidMount() {
        this.props.doSettMaal(this.finnTekst(this.state.options[0]));
    }
    finnTekst(tekstId: string): string {
        return tekst(tekstId, this.props.match.path === URL_ADMIN);
    }
    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        this.props.doSettMaal(e.target.value);
    }
    render() {

        const komponent = () => this.props.harArbeidsgiver ? (
            <SelectKomponent
                onChange={this.handleChange}
                label={this.finnTekst('ingress-hararbeidsgiver')}
            >
                {this.state.options.map(tekstId => {
                    const spm = this.finnTekst(tekstId);
                    return (
                        <option key={tekstId} value={spm}>
                            {spm}
                        </option>
                    );
                })}
            </SelectKomponent>
        ) : (
            <Ingresskomponent><Tekst id="ingress-utenarbeidsgiver"/></Ingresskomponent>

        );

        return (
            <Datalaster avhengigheter={[this.props.arbeidsforhold]}>
                <section className="blokk-l">
                    {komponent()}
                </section>
            </Datalaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    harArbeidsgiver: state.arbeidsforhold.data.harArbeidsgiver,
    arbeidsforhold: state.arbeidsforhold,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettMaal: (maal) => dispatch(maalDuck.actionCreator({maal})),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ingress));
