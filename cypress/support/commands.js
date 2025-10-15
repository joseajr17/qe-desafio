import LoginPage from "../pages/LoginPage";

Cypress.Commands.add('login', (email, password) => {
    LoginPage.typeEmailField(email);
    LoginPage.typePasswordField(password);
    LoginPage.clickLoginBtn();
});

Cypress.Commands.add('validatingVehicleModal', (vehicleName) => {
    let extractedName, vehiclePlate, dailyValue;

    cy.contains('div.vehicle-card', vehicleName).within(() => {
        cy.get('h3').invoke('text').then((text) => {
            extractedName = text.trim();
        });

        cy.contains('p', 'Placa:').invoke('text').then((text) => {
            vehiclePlate = text.match(/Placa:\s*([A-Z0-9]+)/)[1];
        });

        cy.get('p.text-3xl').invoke('text').then((text) => {
            dailyValue = text.match(/\d+/)[0];
        });
    }).then(() => {
        cy.contains('div.vehicle-card', vehicleName)
            .find('button:contains("Alugar")')
            .click();

        cy.get('div[role="dialog"]').should('be.visible');
        cy.contains('Confirme os detalhes do aluguel do veículo')
            .should('be.visible');

        cy.get('div[role="dialog"]').should('be.visible').within(() => {
            cy.contains('h2', 'Alugar Veículo').should('be.visible');

            cy.contains('p', 'Veículo').next().should('have.text', extractedName);
            cy.contains('p', 'Placa').next().should('have.text', vehiclePlate);
            cy.contains('p', 'Diária').next().should('contain.text', dailyValue);
        })
    });
});

Cypress.Commands.add('navigateToCheckoutModal', () => {
    //ETAPA 1: Primeiro Modal
    cy.contains('button', 'Confirmar Aluguel').click();

    //ETAPA 2: Segundo Modal
    cy.contains('h3', 'Resumo do Pedido').should('be.visible');
});