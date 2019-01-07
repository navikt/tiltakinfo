import * as React from 'react';
import './mock-dashboard.less';
import { Select as SelectKomponent } from 'nav-frontend-skjema';
import { Bruker, brukerOptionsRekkefolge } from './mock-data-config';
import './mock-dashboard.less';
import { AppState } from '../redux/reducer';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Dispatch } from '../redux/dispatch-type';
import { connect } from 'react-redux';
import Tekst, { utledTekst } from '../finn-tekst';
import { demoBrukerDuck } from '../redux/generic-reducers';

interface StateProps {
    demobruker: Bruker;
}

interface DispatchProps {
    doSettDemoBruker: (id: string) => void;
}

type MockDashboardProps = StateProps & DispatchProps;

export class MockDashboard extends React.Component<MockDashboardProps> {

    constructor(props: MockDashboardProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        this.props.doSettDemoBruker(e.target.value);
        window.location.reload();
    }

    render() {
        const {demobruker} = this.props;

        return (
            <section className="mockdashboard">
                <Innholdstittel>
                    <Tekst id={'demo-tittel'}/>
                </Innholdstittel>
                <SelectKomponent
                    label={utledTekst('demo-velg-brukertype')}
                    onChange={this.handleChange}
                    id="velg-bruker"
                >
                    {
                        brukerOptionsRekkefolge.map((bruker: string) =>
                            <option
                                key={bruker}
                                value={bruker}
                                selected={demobruker === bruker}
                            >
                                {utledTekst(bruker)}
                            </option>
                        )
                    }
                </SelectKomponent>
            </section>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    demobruker: state.demobruker.id,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    doSettDemoBruker: (id) => dispatch(demoBrukerDuck.actionCreator({id})),
});
export default connect(mapStateToProps, mapDispatchToProps)(MockDashboard);