describe('Login', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Casos positivos', () => {
        it('Deve permitir login com credenciais válidas e redirecionar para a tela do dashboard', () => {
            cy.fixture('validUser.json').then((userCredentials) => {
                cy.login(userCredentials.email, userCredentials.password);

                cy.url().should('include', '/dashboard');
                cy.contains('h1', 'Fleet Manager').should('be.visible');
            });
        });

        it('Deve permitir login mesmo ao inserir email com espaços extras (início e fim) e redirecionar para a tela do dashboard', () => {
            cy.fixture('validUser.json').then((userCredentials) => {
                cy.login(`       ${userCredentials.email}          `, userCredentials.password);

                cy.url().should('include', '/dashboard');
                cy.contains('h1', 'Fleet Manager').should('be.visible');
            });
        });
    });

    context('Casos negativos', () => {
        it('Deve mostrar um pop up de erro ao tentar login com as credenciais inválidas', () => {
            cy.fixture('invalidUser.json').then((userCredentials) => {
                cy.login(userCredentials.wrongEmail, userCredentials.wrongPassword);

                cy.login('emailinvalido@teste.com', 'senhainvalida');

                cy.url().should('not.include', '/dashboard');
                cy.contains('Credenciais inválidas').should('be.visible');
            });
        });

        it('Deve mostrar as mensagens de validação do navegador para campos obrigatórios vazios', () => {
            cy.contains('button', 'Entrar').click();

            cy.get('#email:invalid').should('exist');
            cy.get('#password:invalid').should('exist');
        });

        it('Deve mostrar a mensagem de erro referente a validação do email com formato inválido', () => {
            cy.fixture('invalidUser.json').then((userCredentials) => {
                cy.login(userCredentials.invalidEmail, userCredentials.wrongPassword);

                cy.get('#email:invalid').should('exist');
                cy.url().should('not.include', '/dashboard');
            });
        });
    });
});