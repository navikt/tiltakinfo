import * as React from 'react';
import { Select as SelectKomponent } from 'nav-frontend-skjema';
import * as queryString from 'query-string';
import { Bruker, brukerMocks, brukerOptionsRekkefolge, MockConfig, MockConfigPropName } from './mock-data-config';
import './mock-dashboard.less';
import { Innholdstittel } from 'nav-frontend-typografi';

export class MockDashboard extends React.Component<{}, MockConfig> {
    public state: MockConfig;

    constructor(props: any) { // tslint:disable-line:no-any
        super(props);
        this.state = brukerMocks.defaultMock;

        this.handleChange = this.handleChange.bind(this);
        this.oppdaterUrl = this.oppdaterUrl.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>) { // tslint:disable-line:no-any
        e.preventDefault();
        this.setState(brukerMocks[e.target.value]);
    }

    oppdaterUrl(e: React.SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        location.search = queryString.stringify({
            [MockConfigPropName.UNDER_OPPFOLGING]: this.state[MockConfigPropName.UNDER_OPPFOLGING],
            [MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN]: this.state[MockConfigPropName.HAR_GYLDIG_OIDC_TOKEN],
            [MockConfigPropName.SYKMELDINGER]: this.state[MockConfigPropName.SYKMELDINGER].length > 0
        });
    }

    render() {
        const selectorVerdier = {
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