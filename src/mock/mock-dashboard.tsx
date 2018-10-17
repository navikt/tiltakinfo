import * as React from 'react';
import './mock-dashboard.less';
import { Select as SelectKomponent } from 'nav-frontend-skjema';
import * as queryString from 'query-string';
import { Bruker, brukerMocks, brukerOptionsRekkefolge, MockConfigPropName } from './mock-data-config';
import './mock-dashboard.less';
import { AppState, demoBrukerDuck } from '../redux/reducer';
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
        const demobruker = this.props.demobruker;
        const demobrukerMock = brukerMocks[demobruker];
        location.search = queryString.stringify({
            [MockConfigPropName.UNDER_OPPFOLGING]: demobrukerMock[MockConfigPropName.UNDER_OPPFOLGING],
            [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: demobrukerMock[MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN],
            [MockConfigPropName.SERVICEGRUPPE]: demobrukerMock[MockConfigPropName.SERVICEGRUPPE],
            [MockConfigPropName.ER_SYKMELDT_URLMOCK]: demobruker === Bruker.SYKMELDT_MED_ARBEIDSGIVER
            || demobruker === Bruker.SYKMELDT_UTEN_ARBEIDSGIVER
            || demobruker === Bruker.DEFAULT_MOCK,
            [MockConfigPropName.HAR_ARBEIDSGIVER_URLMOCK]: demobruker === Bruker.SYKMELDT_MED_ARBEIDSGIVER,
        });
    }

    render() {
        const {demobruker} = this.props;
        const selectorVerdier = {
            [Bruker.DEFAULT_MOCK]: 'Velg brukertype:',
            [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: 'Sykmeldt uten arbeidsgiver',
            [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: 'Sykmeldt med arbeidsgiver',
            [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: 'Arbeidsledig situasjonsbestemt',
            [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: 'Arbeidsledig spesielt tilpasset',
            [Bruker.UTENFOR_MAALGRUPPE]: 'Utenfor målgruppe',
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