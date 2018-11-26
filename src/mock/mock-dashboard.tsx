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
import Tekst, { utledTekst } from '../finn-tekst';

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

        if (demobruker === Bruker.DEFAULT_MOCK) {
            location.search = '';
        } else {
            const demobrukerMock = brukerMocks[demobruker];
            location.search = queryString.stringify({
                [MockConfigPropName.UNDER_OPPFOLGING]: demobrukerMock[MockConfigPropName.UNDER_OPPFOLGING],
                [MockConfigPropName.ER_INNLOGGET]: demobrukerMock[MockConfigPropName.ER_INNLOGGET],
                [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: demobrukerMock[MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN],
                [MockConfigPropName.NIVA]: demobrukerMock[MockConfigPropName.NIVA],
                [MockConfigPropName.NIVA_OIDC]: demobrukerMock[MockConfigPropName.NIVA_OIDC],
                [MockConfigPropName.SERVICEGRUPPE]: demobrukerMock[MockConfigPropName.SERVICEGRUPPE],
                [MockConfigPropName.ER_SYKMELDT_URLMOCK]: demobruker === Bruker.SYKMELDT_MED_ARBEIDSGIVER
                || demobruker === Bruker.SYKMELDT_UTEN_ARBEIDSGIVER,
                [MockConfigPropName.HAR_ARBEIDSGIVER_URLMOCK]: demobruker === Bruker.SYKMELDT_MED_ARBEIDSGIVER,
                [MockConfigPropName.VIS_TEKSTER]: queryString.parse(location.search).vistekster,
            });
        }
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