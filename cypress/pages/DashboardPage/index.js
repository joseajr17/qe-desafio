import { elements as el } from './elements'

class DashboardPage {
    dashboardUrl() {
        cy.url().should('include', el.dashboardPath);
    }

    hasDashboardTitle() {
        cy.contains('h1', el.dashboardTitle).should('be.visible');
    }

    getSearchField() {
        return cy.get(el.dashboardInput)
    }

    typeSearchField(nameOrPlate) {
        this.getSearchField().type(nameOrPlate);
    }

    clearSearchField() {
        this.getSearchField().clear();
    }

    getAllVehicleCards() {
        return cy.get(el.vehicleCardsList);
    }

    verifyVehicleCardsNumber(expectedNumber) {
        this.getAllVehicleCards().should('have.length', expectedNumber);
    }

    compareTextCaseInsensitive(actualText, expectedText) {
        expect(actualText.toLowerCase()).to.contain(expectedText.toLowerCase());
    }

    verifySingleVehicleCardWithNameOrPlate(nameOrPlate) {
        this.getAllVehicleCards()
            .should('have.length', 1)
            .first()
            .invoke('text')
            .then((text) => this.compareTextCaseInsensitive(text, nameOrPlate));
    }

    verifyMoreThanOneVehicleCard() {
        this.getAllVehicleCards().its('length').should('be.greaterThan', 1);
    }

    getCardBtn(vehicleStatus) {
        return cy.contains(el.vehicleCard, vehicleStatus).find('button')
    }

    cardBtnIsEnabled(vehicleStatus) {
        this.getCardBtn(vehicleStatus).should('be.enabled');
    }

    cardBtnIsDisabled(vehicleStatus) {
        this.getCardBtn(vehicleStatus).should('be.disabled');
    }

    getTotalCard() {
        return cy.contains('h3', el.totalCardTitle).closest(el.vehicleTotalCard);
    }

    getTotalVehiclesShown() {
        return this.getTotalCard().find(el.totalNumber);
    }

    verifyTotalVehiclesMatchesList() {
        this.getAllVehicleCards().its('length').then((quantidadeDeVeiculos) => {
            this.getTotalVehiclesShown()
                .should('have.text', quantidadeDeVeiculos.toString());
        });
    }

    verifyCardNotExists() {
        this.getAllVehicleCards().should('not.exist');
    }

    getVehicleCardByName(vehicleName) {
        return cy.contains(el.vehicleCard, vehicleName)
    }

    extractVehicleInfo(vehicleName) {
        this.getVehicleCardByName(vehicleName)
            .as('vehicleCard')
            .within(() => {
                cy.get('h3')
                    .invoke('text')
                    .invoke('trim')
                    .as('extractedName');

                cy.contains('p', 'Placa')
                    .invoke('text')
                    .then((text) => text.match(/Placa:\s*([A-Z0-9]+)/)[1])
                    .as('vehiclePlate');

                cy.get('p.text-3xl')
                    .invoke('text')
                    .then((text) => text.match(/\d+/)[0])
                    .as('dailyValue');
            });
    }

    clickRentBtn() {
        cy.get('@vehicleCard').find(el.rentBtn).click();
    }
}

export default new DashboardPage;