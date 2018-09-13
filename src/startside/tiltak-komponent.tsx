import * as React from 'react';
import { Innholdstittel, Ingress, Normaltekst } from 'nav-frontend-typografi';
import './tiltak.less';
import Tekst, { tekst } from '../finn-tekst';
import { Tiltak } from './tiltak-config';
import UtvidetInformasjon from './utvidet-informasjon';
import * as classnames from 'classnames';

interface OwnProps {
    tiltak: Tiltak;
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
                    <img src={this.props.tiltak.ikon} alt="" className="tiltak-ikon"/>
                </div>
                <div className={cls}>
                    <Ingress><Tekst id={this.props.tiltak.hva}/></Ingress>
                    <UtvidetInformasjon
                        apneLabel={tekst(this.props.tiltak.lesmer, false)}
                        lukkLabel="Lukk informasjon"
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
