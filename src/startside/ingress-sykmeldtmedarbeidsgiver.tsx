import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import './ingress-sykmeldtutenarbeidsgiver.less';
import Tekst, { tekst } from '../finn-tekst';
import { AppState, maalDuck } from '../redux/reducer';
import { connect } from 'react-redux';
import './ingress-sykmeldtmedarbeidsgiver.less';
import { RadioPanel } from 'nav-frontend-skjema';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from '../redux/dispatch-type';
import { MAAL_OPTIONS_REKKEFOLGE, MaalOption } from './maal-tiltak-map';

const velgMaalBilde = require('../ikoner/velg-maal.svg');

interface StateProps {
    maalId: MaalOption;
}

interface DispatchProps {
    doSettMaalId: (id: string) => void;
}

type IngressProps = StateProps & DispatchProps & RouteComponentProps<any>; // tslint:disable-line:no-any

interface IngressState {
    options: string[];
}

class IngressSykmeldtMedArbeidsgiver extends React.Component<IngressProps, IngressState> {
    constructor(props: IngressProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        this.props.doSettMaalId(e.target.value);
    }

    render() {
        const {maalId} = this.props;

        return (
            <section className="ingress">
                <div className="ingress__intro">
                    <img
                        src={velgMaalBilde}
                        alt=""
                        className="velg-maal-bilde blokk-l"
                        role="img"
                    />
                    <Innholdstittel tag="h2" className="ingress__tittel">
                        <Tekst id="ingress-medarbeidsgiver"/>
                    </Innholdstittel>
                    <span className="ingress__label-alternativer">
                        <Tekst id="ingress-medarbeidsgiver-tillegg"/>
                    </span>
                </div>
                <span className="skjult" id="beskrivendetekst">
                    <Tekst id="ingress-radiopanelgruppe-skjult"/>
                </span>
                <ul
                    role="group"
                    aria-labelledby="beskrivendetekst"
                    className="ingress__maal"
                >
                    {MAAL_OPTIONS_REKKEFOLGE.map(tekstId => (
                        <li key={tekstId} className="blokk-xs">
                            <RadioPanel
                                name={tekstId}
                                checked={maalId === tekstId}
                                label={tekst(tekstId, false)}
                                value={tekstId}
                                onChange={this.handleChange}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    maalId: state.maal.id,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettMaalId: (id) => dispatch(maalDuck.actionCreator({id})),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IngressSykmeldtMedArbeidsgiver));