import * as React from 'react';
import * as classnames from 'classnames';
import { Innholdstittel, Ingress, Normaltekst } from 'nav-frontend-typografi';
import { Tiltak } from './tiltak-config';
import { MaalOption } from './tiltak-map';
import Tekst, { utledTekst } from '../../finn-tekst';
import UtvidetInformasjon from './utvidet-informasjon';
import { klikkPaLesMerMetrikk, klikkPaLesMerMetrikkMedMaal } from '../../metrics';

interface OwnProps {
    tiltak: Tiltak;
    maalId: MaalOption;
    tiltakErBasertPaMaal: boolean;
}

interface State {
    apen: boolean;
}

export default class TiltakKomponent extends React.Component<OwnProps, State> {

    constructor(props: OwnProps) {
        super(props);
        this.state = {
            apen: false
        };

        this.onToggleApen = this.onToggleApen.bind(this);
    }

    componentDidUpdate(prevProps: OwnProps, prevState: State) {
        const { tiltakErBasertPaMaal, maalId, tiltak } = this.props;

        const lesMerKlikk: boolean = !prevState.apen && this.state.apen;

        if (lesMerKlikk && tiltakErBasertPaMaal) {
            klikkPaLesMerMetrikkMedMaal(maalId, tiltak.id);
        }
        if (lesMerKlikk) {
            klikkPaLesMerMetrikk(tiltak.id);
        }
    }

    onToggleApen() {
        this.setState({apen: !this.state.apen});
    }

    render() {
        const cls = classnames('tiltak-innhold', {
            'tiltak--erUtvidet': this.state.apen
        });

        return (
            <div key={this.props.tiltak.tittel} className="tiltak">
                <div className="tiltak-header">
                    <Innholdstittel className="tiltak-header-tekst">
                        <Tekst id={this.props.tiltak.tittel}/>
                    </Innholdstittel>
                    <img src={this.props.tiltak.ikon} alt="" aria-hidden="true" className="tiltak-ikon"/>
                </div>
                <div className={cls}>
                    <Ingress><Tekst id={this.props.tiltak.hva}/></Ingress>
                    <UtvidetInformasjon
                        apneLabel={utledTekst(this.props.tiltak.lesmer)}
                        lukkLabel={utledTekst('tiltak-lukk-informasjon')}
                        erApen={this.state.apen}
                        onToggle={this.onToggleApen}
                    >
                        <Normaltekst><br/><Tekst id={this.props.tiltak.ekspandertinfo}/></Normaltekst>
                    </UtvidetInformasjon>
                </div>
            </div>
        );
    }
}
