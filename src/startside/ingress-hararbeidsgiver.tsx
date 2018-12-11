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
    checked: MaalOption;
}

class IngressHarArbeidsgiver extends React.Component<IngressProps, State> {

    static radios = [
        { label: 'Samme jobb hos samme arbeidsgiver', value: 'maal-samme-stilling', id: 'maal-samme-stilling' },
        { label: 'Annen jobb hos arbeidsgiveren min', value: 'maal-samme-arbeidsgiver', id: 'maal-samme-arbeidsgiver' },
        { label: 'Jobbe hos en annen arbeidsgiver', value: 'maal-ny-arbeidsgiver', id: 'maal-ny-arbeidsgiver' },
        { label: 'Usikker', value: 'maal-usikker', id: 'maal-usikker' }
    ];

    constructor(props: IngressProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { checked: MaalOption.IKKE_VALGT };
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

    handleChange(event: React.ChangeEvent<HTMLInputElement>, value: MaalOption) {
        this.setState({ checked: value });
        this.props.doSettMaalId(value);
        klikkPaMaalMetrikk(value);
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
                    onChange={this.handleChange}
                    checked={this.state.checked}
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
