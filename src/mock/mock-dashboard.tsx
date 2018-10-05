import * as React from 'react';
import { Select as SelectKomponent } from 'nav-frontend-skjema';
import * as queryString from 'query-string';
import { Bruker, brukerMocks, brukerOptionsRekkefolge, MockConfigPropName } from './mock-data-config';
import './mock-dashboard.less';
import { Innholdstittel } from 'nav-frontend-typografi';

interface MockDashboardState {
    valgtBruker: string;
}

export class MockDashboard extends React.Component<{}, MockDashboardState> {
    public state: MockDashboardState;

    constructor(props: any) { // tslint:disable-line:no-any
        super(props);
        this.state = {valgtBruker: 'ikkeValgt'};

        this.handleChange = this.handleChange.bind(this);
        this.oppdaterUrl = this.oppdaterUrl.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) { // tslint:disable-line:no-any
        e.preventDefault();
        this.setState({valgtBruker: e.target.value});
    }

    oppdaterUrl(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        const { valgtBruker } = this.state;
        location.search = queryString.stringify({
            [MockConfigPropName.UNDER_OPPFOLGING]: brukerMocks[valgtBruker].underOppfolging,
            [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: brukerMocks[valgtBruker].harGyldigOidcToken,
            [MockConfigPropName.SERVICEGRUPPE]: brukerMocks[valgtBruker].servicegruppe,
            [MockConfigPropName.ER_SYKMELDT_URLMOCK]: valgtBruker === Bruker.SYKMELDT_MED_ARBEIDSGIVER
                                                    || valgtBruker === Bruker.SYKMELDT_UTEN_ARBEIDSGIVER
                                                    || valgtBruker === Bruker.DEFAULT_MOCK,
            [MockConfigPropName.HAR_ARBEIDSGIVER_URLMOCK]: valgtBruker === Bruker.SYKMELDT_MED_ARBEIDSGIVER,
        });
    }

    render() {
        const selectorVerdier = {
            [Bruker.SYKMELDT_UTEN_ARBEIDSGIVER]: 'Sykmeldt uten arbeidsgiver',
            [Bruker.SYKMELDT_MED_ARBEIDSGIVER]: 'Sykmeldt med arbeidsgiver',
            [Bruker.ARBEIDSLEDIG_SITUASJONSBESTEMT]: 'Arbeidsledig situasjonsbestemt',
            [Bruker.ARBEIDSLEDIG_SPESIELT_TILPASSET]: 'Arbeidsledig spesielt tilpasset',
        };
        return (
            <section className="mockdashboard">
                <Innholdstittel>Demo</Innholdstittel>
                <SelectKomponent
                    label="Velg brukertypen for demoen"
                    onChange={this.handleChange}
                    id="velg-bruker"
                >
                    <option value="velg-brukertype">
                        Velg brukertype:
                    </option>
                    {
                        brukerOptionsRekkefolge.map((bruker: string) =>
                            <option key={bruker} value={bruker}>
                                {selectorVerdier[bruker]}
                            </option>
                        )
                    }
                </SelectKomponent>
                <button className="knapp knapp--hoved" onClick={this.oppdaterUrl}>
                    Velg bruker
                </button>
            </section>
        );
    }
}

export default MockDashboard;