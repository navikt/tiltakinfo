import * as React from 'react';
import NavFrontendChevron from 'nav-frontend-chevron';
import './info-toggler.less';

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
                <span className="infoToggler__label">{children}</span>
                <span className="infoToggler__chevron">
                    <NavFrontendChevron type={apen ? 'opp' : 'ned'}/>
                </span>
            </span>
            </button>
        );
    }
}

export default InfoToggler;
