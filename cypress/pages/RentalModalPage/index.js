import { elements as el } from './elements';
import DashboardPage from '../DashboardPage';

class RentalModalPage {
    getRentalModal() {
        return cy.get(el.rentalModal);
    }

    verifyModalIsVisible() {
        return this.getRentalModal().should('be.visible');
    }

    verifyModalNotExists() {
        cy.get(el.rentalModal).should('not.exist');
    }

    verifyRentalModal() {
        this.verifyModalIsVisible()
            .within(function () {
                cy.contains('h2', el.modalTitle).should('be.visible');
                cy.contains(el.modalSubTitle).should('be.visible');

                cy.contains('p', 'Veículo').next().should('have.text', this.extractedName);
                cy.contains('p', 'Placa').next().should('have.text', this.vehiclePlate);
                cy.contains('p', 'Diária').next().should('contain.text', this.dailyValue);
            });
    }

    validateVehicleModal(vehicleName) {
        DashboardPage.extractVehicleInfo(vehicleName);
        DashboardPage.clickRentBtn();
        this.verifyRentalModal();
    }

    getDailyValue() {
        return cy.contains('p', 'Diária')
            .next('p')
            .invoke('text')
            .then((text) => Number(text.replace(/[^\d]/g, '')));
    }

    typeDaysField(days) {
        cy.get(el.daysField).type(days);
    }

    daysFieldHasValue(value) {
        cy.get(el.daysField).should('have.value', value);
    }

    clickDaysField() {
        cy.get(el.daysField).click();
    }

    getBoxDescription() {
        return cy.get(el.boxDescription);
    }

    amountHasExpectedValue(expectedValue) {
        this.getBoxDescription().within(() => {
            cy.get(el.valueTotalLabel)
                .should('contain.text', `R$ ${expectedValue}`);
        });
    }

    descriptionHasExpectedValues(days, dailyValue) {
        this.getBoxDescription().within(() => {
            cy.get(el.descriptionValuesLabel)
                .should('contain.text', `${days} dias × R$ ${dailyValue}`);
        });
    }

    verifyDescriptionValues(days) {
        this.getDailyValue().then((dailyValue) => {
            this.typeDaysField(days);
            this.descriptionHasExpectedValues(days, dailyValue);
        });
    }

    verifyAmountValue(days) {
        this.getDailyValue().then((dailyValue) => {
            const totalExpectedValue = days * dailyValue;

            this.typeDaysField(days);
            this.amountHasExpectedValue(totalExpectedValue);
        });
    }

    clickCancelBtn() {
        cy.contains('button', el.cancelBtnLabel).click();
    }

    clickCloseBtn() {
        cy.contains('button', el.closeBtnLabel).click();
    }

    clickConfirmBtn() {
        cy.contains('button', el.confirmBtnLabel).click();
    }
}

export default new RentalModalPage;