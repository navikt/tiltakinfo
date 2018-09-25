import * as React from 'react';
import './mock-dashboard.less';
import { Select as SelectKomponent } from 'nav-frontend-skjema';
import * as queryString from 'query-string';
import { AppState, demoBrukerDuck } from '../redux/reducer';
import {
    Bruker, brukerMocks, brukerOptionsRekkefolge, MockConfigPropName
} from './mock-data-config';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Dispatch } from '../redux/dispatch-type';
import { connect } from 'react-redux';

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
        this.oppdaterUrl = this.oppdaterUrl.bind(this);
    }

    componentDidUpdate () {
        this.oppdaterUrl();
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        this.props.doSettDemoBruker(e.target.value);
    }

    oppdaterUrl() {
        const demobruker = brukerMocks[this.props.demobruker];
        location.search = queryString.stringify({
            [MockConfigPropName.UNDER_OPPFOLGING]: demobruker[MockConfigPropName.UNDER_OPPFOLGING],
            [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: demobruker[MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN],
            [MockConfigPropName.SYKMELDINGER]: demobruker[MockConfigPropName.SYKMELDINGER].length > 0
        });
    }

    render() {
        const {demobruker} = this.props;
        const selectorVerdier = {
            [Bruker.DEFAULT_MOCK_BRUKER]: 'Velg brukertype:',
            [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: 'Sykmeldt uten arbeidsgiver',
            [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: 'Sykmeldt med arbeidsgiver',
        };

        return (
            <section className="mockdashboard">
                <Innholdstittel>Demo</Innholdstittel>
                <SelectKomponent
                    label="Velg brukertypen for demoen"
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
                                {selectorVerdier[bruker]}
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