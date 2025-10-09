describe('Modal de aluguel', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login('admin@teste.com', '123456');
        cy.url().should('include', '/dashboard');
        cy.contains('h1', 'Fleet Manager').should('be.visible');
    });

    context('Casos positivos', () => {
        it('Deve abrir o modal e exibir os dados corretos do escolhido', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);
            });
        });

        it('Deve calcular o valor total corretamente ao inserir 3 dias no veículo escolhido', () => {
            cy.fixture('rental.json').then((rentalData) => {
                const days = rentalData.daysForCalculation;
                const dailyValue = rentalData.vehicle.dailyValue;
                const TotalExpectedValue = days * dailyValue;

                cy.validatingVehicleModal(rentalData.vehicle.name);

                cy.get('#days').type(days);

                cy.get('div.bg-green-50').within(() => {
                    cy.get('span.font-bold.text-green-600')
                        .should('contain.text', `R$ ${TotalExpectedValue}`);
                });
            });
        });

        it('Deve mostrar a descrição do cálculo corretamente ao inserir 3 dias no veículo escolhido', () => {
            cy.fixture('rental.json').then((rentalData) => {
                const days = rentalData.daysForCalculation;
                const dailyValue = rentalData.vehicle.dailyValue;

                cy.validatingVehicleModal(rentalData.vehicle.name);

                cy.get('#days').type(days);

                cy.get('div.bg-green-50').within(() => {
                    cy.get('p.text-xs.text-green-600')
                        .should('contain.text', `${days} dias × R$ ${dailyValue}`);
                });
            });
        });

        it('Deve fechar o modal ao pressionar o botão "Cancelar"', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                cy.get('.flex-col-reverse > .border').click();

                cy.get('div[role="dialog"]').should('not.exist');
            });
        });

        it('Deve fechar o modal ao pressionar o botão "X"', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                cy.contains('button', 'Close').click()

                cy.get('div[role="dialog"]').should('not.exist');
            });
        });

        it('Deve decrementar o número de dias ao pressionar a seta para baixo', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                cy.get('#days').type('2');
                cy.get('#days').should('have.value', '2');

                cy.get('#days').click();

                cy.get('#days').type('{downarrow}')

                cy.get('#days').should('have.value', '1');
            });
        });

        it('Deve incrementar o número de dias ao pressionar a seta para cima', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                cy.get('#days').should('have.value', '1');

                cy.get('#days').click();

                cy.get('#days').type('{uparrow}');

                cy.get('#days').should('have.value', '2');
            });
        });

        it('Deve permitir alugar um veículo com sucesso e redirecionar para o modal de "Resumo do Pedido"', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.nameForRent);

                cy.contains('button', 'Confirmar Aluguel').click();

                cy.contains('h3', 'Resumo do Pedido').should('be.visible');
            });


        });
    });

    context('Casos negativos', () => {
        it('Deve impedir decrementar o número de dias abaixo de 1 ao pressionar a seta do teclado', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                cy.get('#days').should('have.value', '1');

                cy.get('#days').type('{downarrow}');

                cy.get('#days').should('have.value', '1');
            });
        });
    });
});