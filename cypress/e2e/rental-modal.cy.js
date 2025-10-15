import DashboardPage from "../pages/DashboardPage";
import RentalModalPage from "../pages/RentalModalPage";

describe('Modal de aluguel', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login('admin@teste.com', '123456');

        DashboardPage.dashboardUrl();
        DashboardPage.hasDashboardTitle();
    });

    context('Casos positivos', () => {
        it('Deve abrir o modal e exibir os dados corretos do escolhido', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);
            });
        });

        it('Deve calcular o valor total corretamente ao inserir 3 dias no veículo escolhido', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                const days = rentalData.daysForCalculation;
                RentalModalPage.verifyAmountValue(days);
            });
        });

        it('Deve mostrar a descrição do cálculo corretamente ao inserir 3 dias no veículo escolhido', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                const days = rentalData.daysForCalculation;
                RentalModalPage.verifyDescriptionValues(days);
            });
        });

        it('Deve fechar o modal ao pressionar o botão "Cancelar"', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                RentalModalPage.clickCancelBtn();
                RentalModalPage.verifyModalNotExists();
            });
        });

        it('Deve fechar o modal ao pressionar o botão "X"', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                RentalModalPage.clickCloseBtn();
                RentalModalPage.verifyModalNotExists();
            });
        });

        it('Deve decrementar o número de dias ao pressionar a seta para baixo', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                RentalModalPage.typeDaysField('2');
                RentalModalPage.daysFieldHasValue('2');
                RentalModalPage.clickDaysField();
                RentalModalPage.typeDaysField('{downarrow}');
                RentalModalPage.daysFieldHasValue('1');
            });
        });

        it('Deve incrementar o número de dias ao pressionar a seta para cima', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                RentalModalPage.daysFieldHasValue('1');

                RentalModalPage.clickDaysField();

                RentalModalPage.typeDaysField('{uparrow}');

                RentalModalPage.daysFieldHasValue('2');
            });
        });

        it('Deve permitir alugar um veículo com sucesso e redirecionar para o modal de "Resumo do Pedido"', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.nameForRent);

                RentalModalPage.clickConfirmBtn();

                // Parte do outro modal 
                cy.contains('h3', 'Resumo do Pedido').should('be.visible');
            });
        });
    });

    context('Casos negativos', () => {
        it('Deve impedir decrementar o número de dias abaixo de 1 ao pressionar a seta do teclado', () => {
            cy.fixture('rental.json').then((rentalData) => {
                cy.validatingVehicleModal(rentalData.vehicle.name);

                RentalModalPage.daysFieldHasValue('1');
                RentalModalPage.typeDaysField('{downarrow}');
                RentalModalPage.daysFieldHasValue('1');
            });
        });
    });
});