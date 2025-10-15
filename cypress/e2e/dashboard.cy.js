import DashboardPage from "../pages/DashboardPage";

describe('Dashboard', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login('admin@teste.com', '123456');

        DashboardPage.dashboardUrl();
        DashboardPage.hasDashboardTitle();
    });

    context('Casos positivos', () => {
        it('Deve filtrar veículos pelo modelo digitado', () => {
            cy.fixture('dashboardInputs.json').then((inputs) => {
                DashboardPage.typeSearchField(inputs.nameSearched);
                DashboardPage.verifySingleVehicleCardWithNameOrPlate(inputs.nameSearched);
            });
        });

        it('Deve filtrar veículos pela placa digitada', () => {
            cy.fixture('dashboardInputs.json').then((inputs) => {
                DashboardPage.typeSearchField(inputs.plateSearched);
                DashboardPage.verifySingleVehicleCardWithNameOrPlate(inputs.plateSearched);
            });
        });

        it('Deve exibir todos os veículos ao limpar o filtro', () => {
            DashboardPage.typeSearchField('fiat');
            DashboardPage.verifyVehicleCardsNumber(1);
            DashboardPage.clearSearchField();
            DashboardPage.verifyMoreThanOneVehicleCard();
        });

        it('Deve exibir no card "Total de Veículos" a quantidade correta de veículos listados', () => {
            DashboardPage.verifyTotalVehiclesMatchesList();
        });

        it('Deve habilitar o botão "Alugar" para veículos com status "Disponível"', () => {
            DashboardPage.cardBtnIsEnabled('Disponível');
        });
    });

    context('Casos negativos', () => {
        it('Deve exibir nenhum card ao realizar uma busca inválida', () => {
            DashboardPage.typeSearchField('abcdef');
            DashboardPage.verifyCardNotExists();
        });

        it('Deve desabilitar o botão "Alugar" para veículos com status "Alugado"', () => {
            DashboardPage.cardBtnIsDisabled('Alugado');
        });

        it('Deve desabilitar o botão "Alugar" para veículos com status "Manutenção"', () => {
            DashboardPage.cardBtnIsDisabled('Manutenção');
        });
    });
});