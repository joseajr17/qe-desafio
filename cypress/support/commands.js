import LoginPage from "../pages/LoginPage";
import RentalModalPage from "../pages/RentalModalPage";

Cypress.Commands.add('login', (email, password) => {
    LoginPage.typeEmailField(email);
    LoginPage.typePasswordField(password);
    LoginPage.clickLoginBtn();
});

Cypress.Commands.add('validatingVehicleModal', (vehicleName) => {
    RentalModalPage.validateVehicleModal(vehicleName);
});

Cypress.Commands.add('navigateToCheckoutModal', () => {
    //ETAPA 1: Primeiro Modal
    cy.contains('button', 'Confirmar Aluguel').click();

    //ETAPA 2: Segundo Modal
    cy.contains('h3', 'Resumo do Pedido').should('be.visible');
});