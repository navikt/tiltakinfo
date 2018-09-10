import * as React from 'react';
import * as classnames from 'classnames';
import { guid } from 'nav-frontend-js-utils';
import InfoToggler from './infoToggler';
import './utvidetInformasjon.less';
import EkspanderbartInnhold from './ekspanderbartInnhold';

interface OwnProps {
    children: React.ReactNode;
    erApen: boolean;
    apneLabel: string;
    lukkLabel: string;
    onToggle: () => void;
}

type Props = OwnProps;

class UtvidetInformasjon extends React.Component<Props> {
    innholdId: string;

    constructor(props: Props) {
        super(props);
        this.innholdId = guid();
    }
    render() {
        const cls = classnames('utvidetInformasjon', {
            'utvidetInformasjon--apen': this.props.erApen
        });

        const {
            apneLabel = 'utvidetinfo.lesmer',
            lukkLabel = 'utvidetinfo.lukk'
        } = this.props;
        return (
            <div className={cls}>
                <div className="utvidetInformasjon__toggler no-print">
                    <InfoToggler
                        onToggle={this.props.onToggle}
                        apen={this.props.erApen}
                    >
                        {this.props.erApen ? lukkLabel : apneLabel}
                    </InfoToggler>
                </div>
                <div className="utvidetInformasjon__innhold" id={this.innholdId}>
                    <EkspanderbartInnhold erApen={this.props.erApen}>
                        {' '}
                        {this.props.children}
                    </EkspanderbartInnhold>

                    <div className="print-only">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default UtvidetInformasjon;
