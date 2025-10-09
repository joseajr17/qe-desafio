describe('Dashboard', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login('admin@teste.com', '123456');
        cy.url().should('include', '/dashboard');
        cy.contains('h1', 'Fleet Manager').should('be.visible');
    });

    context('Casos positivos', () => {
        it('Deve filtrar veículos pelo modelo digitado', () => {
            cy.get('.relative > .flex').type('fiat');

            cy.get('div.grid > div.vehicle-card').should('have.length', 1);

            cy.contains('div.grid > div.vehicle-card', 'Fiat Uno').should('have.length', 1);
        });

        it('Deve filtrar veículos pela placa digitada', () => {
            cy.get('.relative > .flex').type('XYZ5678');

            cy.get('div.grid > div.vehicle-card').should('have.length', 1);

            cy.contains('div.grid > div.vehicle-card', 'XYZ5678').should('have.length', 1);
        });

        it('Deve exibir todos os veículos ao limpar o filtro', () => {

            cy.get('.relative > .flex').type('fiat');

            cy.get('div.grid > div.vehicle-card').should('have.length', 1);

            cy.get('.relative > .flex').clear();

            cy.get('div.grid > div.vehicle-card').should('have.length.greaterThan', 1);
        });

        it('Deve exibir no card "Total de Veículos" a quantidade correta de veículos listados', () => {
            cy.get('div.grid > div.vehicle-card').its('length').then((quantidadeDeVeiculos) => {
                cy.contains('h3', 'Total de Veículos')
                    .closest('.dashboard-card')
                    .find('div.text-3xl.font-bold.text-blue-600')
                    .should('have.text', quantidadeDeVeiculos.toString());
            });
        });

        it('Deve habilitar o botão "Alugar" para veículos com status "Disponível"', () => {
            cy.contains('div.vehicle-card', 'Disponível').find('button').should('be.enabled');
        });
    });

    context('Casos negativos', () => {
        it('Deve exibir nenhum card ao realizar uma busca inválida', () => {
            cy.get('.relative > .flex').type('abcdef');

            cy.get('div.grid > div.vehicle-card').should('not.exist');
        });

        it('Deve desabilitar o botão "Alugar" para veículos com status "Alugado"', () => {
            cy.contains('div.vehicle-card', 'Alugado').find('button').should('be.disabled');
        });

        it('Deve desabilitar o botão "Alugar" para veículos com status "Manutenção"', () => {
            cy.contains('div.vehicle-card', 'Manutenção').find('button').should('be.disabled');
        });
    });
});