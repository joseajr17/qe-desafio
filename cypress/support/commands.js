import LoginPage from "../pages/LoginPage";
import RentalModalPage from "../pages/RentalModalPage";
import CheckoutModalPage from "../pages/CheckoutModalPage";

Cypress.Commands.add('login', (email, password) => {
    LoginPage.typeEmailField(email);
    LoginPage.typePasswordField(password);
    LoginPage.clickLoginBtn();
});

Cypress.Commands.add('validatingVehicleModal', (vehicleName) => {
    RentalModalPage.validateVehicleModal(vehicleName);
});

Cypress.Commands.add('navigateToCheckoutModal', (vehicleName) => {
    cy.validatingVehicleModal(vehicleName);

    RentalModalPage.clickConfirmBtn();

    CheckoutModalPage.hasModalTitle();
});
