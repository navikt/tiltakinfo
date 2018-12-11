import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import './ingress-utenarbeidsgiver.less';
import Tekst from '../finn-tekst';
import { AppState, maalDuck } from '../redux/reducer';
import { connect } from 'react-redux';
import './ingress-hararbeidsgiver.less';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from '../redux/dispatch-type';
import { MaalOption } from './tiltak-map';
import { polyfill } from 'smoothscroll-polyfill';
import { klikkPaMaalMetrikk } from '../metrics';

polyfill();

const velgMaalBilde = require('../ikoner/velg-maal.svg');

interface StateProps {
    maalId: MaalOption;
}

interface DispatchProps {
    doSettMaalId: (id: MaalOption) => void;
}

type IngressProps = StateProps & DispatchProps & RouteComponentProps<any>; // tslint:disable-line:no-any

interface State {
    checked: string;
}

class IngressHarArbeidsgiver extends React.Component<IngressProps, State> {

    static radios = [
        { label: 'Samme jobb hos samme arbeidsgiver', value: 'maal-samme-stilling', id: 'maal-samme-stilling' }, // tslint:disable-line
        { label: 'Annen jobb hos arbeidsgiveren min', value: 'maal-samme-arbeidsgiver', id: 'maal-samme-arbeidsgiver' }, // tslint:disable-line
        { label: 'Jobbe hos en annen arbeidsgiver', value: 'maal-ny-arbeidsgiver', id: 'maal-ny-arbeidsgiver' }, // tslint:disable-line
        { label: 'Usikker', value: 'maal-ny-arbeidsgiver', id: 'maal-usikker' }
    ];

    constructor(props: IngressProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { checked: 'maal-samme-stilling' };
    }

    componentDidUpdate () {
        const tiltakContainer = document.querySelector('.tiltak-container');

        if (tiltakContainer) {
            tiltakContainer.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
        }
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const maalId: MaalOption = e.target.value as MaalOption;
        this.props.doSettMaalId(maalId);
        this.setState({ checked: maalId });
        klikkPaMaalMetrikk(maalId);
    }

    render() {
        return (
            <section className="ingress">
                <div className="ingress__intro">
                    <img
                        src={velgMaalBilde}
                        alt=""
                        aria-hidden="true"
                        className="velg-maal-bilde blokk-l"
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
                <RadioPanelGruppe
                    name="situasjon"
                    legend=""
                    radios={IngressHarArbeidsgiver.radios}
                    checked={this.state.checked}
                    onChange={this.handleChange}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IngressHarArbeidsgiver));
