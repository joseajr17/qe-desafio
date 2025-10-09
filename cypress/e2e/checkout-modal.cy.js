describe('Modal de pagamento', () => {
    beforeEach(() => {
        cy.visit('/');

        cy.login('admin@teste.com', '123456');

        cy.url().should('include', '/dashboard');

        cy.contains('h1', 'Fleet Manager').should('be.visible');
    });

    context('Casos positivos', () => {
        it('Deve aplicar um cupom válido e recalcular o valor final com desconto', () => {
            cy.fixture('checkout.json').then((checkoutData) => {
                cy.validatingVehicleModal(checkoutData.vehicles.lowValue);

                cy.navigateToCheckoutModal();

                let subtotalValue;
                const extractValue = (text) => parseFloat(text.replace('R$', '').trim());

                cy.contains('span', 'Subtotal:').next('span').invoke('text').then(text => {
                    subtotalValue = extractValue(text);
                });

                cy.get('input[placeholder="Ex: DESCONTO50"]').type(checkoutData.coupon.valid);
                cy.contains('button', 'Aplicar').click();

                cy.contains('Cupom Aplicado!').should('be.visible');

                cy.get('span:contains("Valor Final")')
                    .siblings('span')
                    .invoke('text')
                    .then(finalValueText => {
                        const finalValue = extractValue(finalValueText);
                        const expectedValue = subtotalValue - checkoutData.coupon.value;

                        if (expectedValue < 0)
                            expect(finalValue).to.eq(0);
                        else
                            expect(finalValue).to.eq(expectedValue);
                    });
            });
        });

        it('Deve alternar a seleção entre as formas de pagamento: Cartão de Crédito e PIX', () => {
            cy.fixture('checkout.json').then((checkoutData) => {
                cy.validatingVehicleModal(checkoutData.vehicles.midValue);

                cy.navigateToCheckoutModal();

                cy.get(`button[role="radio"][value="Cartão"]`)
                    .should('have.attr', 'aria-checked', 'true');

                cy.get(`button[role="radio"][value="Pix"]`)
                    .should('have.attr', 'aria-checked', 'false')
                    .click()
                    .should('have.attr', 'aria-checked', 'true');

                cy.get(`button[role="radio"][value="Cartão"]`)
                    .should('have.attr', 'aria-checked', 'false')
                    .click()
                    .should('have.attr', 'aria-checked', 'true');

                cy.get(`button[role="radio"][value="Pix"]`)
                    .should('have.attr', 'aria-checked', 'false');
            });
        });
    });

    context('Casos negativos', () => {
        it('Deve manter o valor final inalterado ao utilizar um cupom inválido', () => {
            cy.fixture('checkout.json').then((checkoutData) => {
                cy.validatingVehicleModal(checkoutData.vehicles.highValue);

                cy.navigateToCheckoutModal();

                let subtotalValue;
                const extractValue = (text) => parseFloat(text.replace('R$', '').trim());

                cy.contains('span', 'Subtotal:').next('span').invoke('text').then(text => {
                    subtotalValue = extractValue(text);
                });

                cy.get('input[placeholder="Ex: DESCONTO50"]').type(checkoutData.coupon.invalid);
                cy.contains('button', 'Aplicar').click();

                cy.get('input[placeholder="Ex: DESCONTO50"]').should('be.visible');
                cy.contains('button', 'Aplicar').should('be.visible');

                cy.get('span:contains("Valor Final")').siblings('span').invoke('text').then(finalValueText => {
                    const finalValue = extractValue(finalValueText);
                    expect(finalValue).to.eq(subtotalValue);
                });
            });
        });
    });
});