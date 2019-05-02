import { Selector } from "testcafe";

fixture `Tiltakinfo`;

const velgBrukerSelect = Selector('#velg-bruker');

test('Sykmeldt med arbeidsgiver', async t => {
    await t
        .navigateTo(`http://localhost:4502/tiltakinfo/demo/index.html`)
        .expect(Selector('.mockdashboard').exists).ok()
        .click(velgBrukerSelect)
        .click(velgBrukerSelect.find('[value=bruker-sykmeldt-med-arbeidsgiver]'))
        .takeScreenshot()
});

