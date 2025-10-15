import { elements as el } from './elements'

class LoginPage {
    typeEmailField(email) {
        cy.get(el.email).type(email);
    }

    typePasswordField(password) {
        cy.get(el.password).type(password);
    }

    clickLoginBtn() {
        cy.contains('button', el.btnEnter).click();
    }

    showInvalidCredentials() {
        cy.contains(el.invalidCredentialsMsg).should('be.visible');
    }

    emailFieldIsInvalid() {
        cy.get(el.invalidEmailField).should('exist');
    }

    passwordFieldIsInvalid() {
        cy.get(el.invalidPasswordField).should('exist');
    }

    loginUrl() {
        cy.url().should('include', el.loginPath);
    }
}

export default new LoginPage;