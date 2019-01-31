import * as React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import './info-toggler.less';
import { Normaltekst } from 'nav-frontend-typografi';

interface ToggleLenkeProps {
    children: React.ReactNode;
    onToggle: () => void;
    apen?: boolean;
}

class InfoToggler extends React.Component<ToggleLenkeProps> {
    render() {
        const {apen = false, children, onToggle} = this.props;
        return (
            <button
                className="infoToggler"
                onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                    onToggle();
                }}
                aria-expanded={apen}
            >
            <span className="infoToggler__content">
                <Normaltekst className="infoToggler__label">{children}</Normaltekst>
            </span>
            <span className="infoToggler__chevron">
                <NavFrontendChevron type={apen ? 'opp' : 'ned'}/>
            </span>
            </button>
        );
    }
}

export default InfoToggler;
