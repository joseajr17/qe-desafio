import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Casos positivos', () => {
        it('Deve permitir login com credenciais válidas e redirecionar para a tela do dashboard', () => {
            cy.fixture('validLogin.json').then((userCredentials) => {
                cy.login(userCredentials.email, userCredentials.password);
                
                DashboardPage.dashboardUrl();
                DashboardPage.hasDashboardTitle();
            });
        });

        it('Deve permitir login mesmo ao inserir email com espaços extras (início e fim) e redirecionar para a tela do dashboard', () => {
            cy.fixture('validLogin.json').then((userCredentials) => {
                cy.login(`       ${userCredentials.email}          `, userCredentials.password);
                
                DashboardPage.dashboardUrl();
                DashboardPage.hasDashboardTitle();
            });
        });
    });

    context('Casos negativos', () => {
        it('Deve mostrar um pop up de erro ao tentar login com as credenciais inválidas', () => {
            cy.fixture('invalidLogin.json').then((userCredentials) => {
                cy.login(userCredentials.invalidEmail, userCredentials.wrongPassword);

                LoginPage.emailFieldIsInvalid();
                LoginPage.loginUrl();
            });
        });

        it('Deve mostrar as mensagens de validação do navegador para campos obrigatórios vazios', () => {
            LoginPage.clickLoginBtn();
            LoginPage.emailFieldIsInvalid();
            LoginPage.passwordFieldIsInvalid();
            LoginPage.loginUrl();
        });

        it('Deve mostrar a mensagem de erro referente a validação do email com formato inválido', () => {
            cy.fixture('invalidLogin.json').then((userCredentials) => {
                cy.login(userCredentials.invalidEmail, userCredentials.wrongPassword);

                LoginPage.emailFieldIsInvalid();
                LoginPage.loginUrl();
            });
        });
    });
});