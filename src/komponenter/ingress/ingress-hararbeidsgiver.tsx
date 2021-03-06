import * as React from 'react';
import { connect } from 'react-redux';
import { polyfill } from 'smoothscroll-polyfill';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { RouteComponentProps, withRouter } from 'react-router';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { MaalOption } from '../tiltak/tiltak-map';
import { klikkPaMaalMetrikk } from '../../metrics';
import Tekst, { utledTekst } from '../../finn-tekst';
import { Dispatch } from '../../redux/dispatch-type';
import { AppState } from '../../redux/reducer';
import { maalDuck } from '../../redux/generic-reducers';

const velgMaalBilde = require('../../ikoner/velg-maal.svg');
import './ingress-hararbeidsgiver.less';

polyfill();

interface StateProps {
    maalId: string;
}

interface DispatchProps {
    doSettMaalId: (id: string) => void;
}

type IngressProps = StateProps & DispatchProps & RouteComponentProps<any>; // tslint:disable-line:no-any

interface State {
    checked: string;
}

class IngressHarArbeidsgiver extends React.Component<IngressProps, State> {

    static radios = [
        {
            label: utledTekst('maal-samme-stilling'),
            value: MaalOption.SAMME_STILLING,
            id: MaalOption.SAMME_STILLING
        },
        {
            label: utledTekst('maal-samme-arbeidsgiver'),
            value: MaalOption.SAMME_ARBEIDSGIVER,
            id: MaalOption.SAMME_ARBEIDSGIVER
        }, // tslint:disable-line
        {
            label: utledTekst('maal-ny-arbeidsgiver'),
            value: MaalOption.NY_ARBEIDSGIVER,
            id: MaalOption.NY_ARBEIDSGIVER
        }, // tslint:disable-line
        {
            label: utledTekst('maal-usikker'),
            value: MaalOption.USIKKER,
            id: MaalOption.USIKKER
        }
    ];

    constructor(props: IngressProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {checked: this.props.maalId};
    }

    componentDidUpdate() {
        const tiltakContainer = document.querySelector('.tiltak-container');

        if (tiltakContainer) {
            tiltakContainer.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            });
        }
    }

    handleChange(event: React.SyntheticEvent<EventTarget, Event>, value: string) {
        this.setState({checked: value});
        this.props.doSettMaalId(value);
        klikkPaMaalMetrikk(value);
    }

    render() {
        return (
            <>
                <div className="ingress__intro">
                    <img
                        src={velgMaalBilde}
                        alt=""
                        aria-hidden="true"
                        className="velg-maal-bilde blokk-l"
                    />
                    <Innholdstittel tag="h2" className="blokk-s">
                        <Tekst id="ingress-medarbeidsgiver"/>
                    </Innholdstittel>
                    <Normaltekst className="blokk-m">
                        <Tekst id="ingress-medarbeidsgiver-tillegg"/>
                    </Normaltekst>
                </div>
                <RadioPanelGruppe
                    className="ingress__radiopanel"
                    name="situasjon"
                    legend={utledTekst('ingress-radiopanelgruppe-skjult')}
                    radios={IngressHarArbeidsgiver.radios}
                    onChange={this.handleChange}
                    checked={this.state.checked}
                />
            </>
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
