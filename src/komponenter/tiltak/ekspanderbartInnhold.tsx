import * as React from 'react';
import * as classnames from 'classnames';
import { Collapse } from 'react-collapse';
import './ekspanderbartInnhold.less';

export interface OwnProps {
    /** Innholdet som skal vises */
    children: React.ReactNode;
    /** Overstyre state for om den skal vises eller ikke */
    erApen?: boolean;
    /** Default off */
    ariaLive?: 'assertive' | 'polite' | 'off';
    /** Om skjul/vis skal animeres. Default true */
    animert?: boolean;
    /** Om noe av innholdet er ekspandertbart */
    harEkspanderbartInnhold?: boolean;
}

class EkspanderbartInnhold extends React.Component<OwnProps> {
    render() {
        const {children, animert = true, harEkspanderbartInnhold = false, erApen = false, ariaLive = 'off'} = this.props;
        const content = <div aria-live={ariaLive}>{erApen ? <>{children}</> : null}</div>;
        if (!animert) {
            return content;
        }
        return (
            <Collapse
                isOpened={erApen}
                springConfig={{stiffness: 250, damping: 30}}
                className={classnames('ekspanderbartInnhold', {
                    'ekspanderbartInnhold--apen': erApen
                })}
                hasNestedCollapse={harEkspanderbartInnhold}
            >
                {content}
            </Collapse>
        );
    }
}

export default EkspanderbartInnhold;
