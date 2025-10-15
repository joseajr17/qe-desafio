import DashboardPage from "../pages/DashboardPage";
import CheckoutModalPage from "../pages/CheckoutModalPage";

describe('Modal de pagamento', () => {
    beforeEach(() => {
        cy.visit('/');

        cy.login('admin@teste.com', '123456');

        DashboardPage.dashboardUrl();
        DashboardPage.hasDashboardTitle();
    });

    context('Casos positivos', () => {
        it('Deve aplicar um cupom válido e recalcular o valor final com desconto', () => {
            cy.fixture('checkout.json').then((checkoutData) => {
                cy.navigateToCheckoutModal(checkoutData.vehicles.lowValue);

                CheckoutModalPage.applyValidCouponAndVerifyDiscount(checkoutData.coupon.valid, checkoutData.coupon.value);
            });
        });

        it('Deve alternar a seleção entre as formas de pagamento: Cartão de Crédito e PIX', () => {
            cy.fixture('checkout.json').then((checkoutData) => {
                cy.navigateToCheckoutModal(checkoutData.vehicles.midValue);

                CheckoutModalPage.verifyRadioBtnStatus("Cartão", 'true');
                CheckoutModalPage.clickRadioBtn("Pix");
                CheckoutModalPage.clickRadioBtn("Cartão");
                CheckoutModalPage.verifyRadioBtnStatus("Pix", 'false');
            });
        });
    });

    context('Casos negativos', () => {
        it('Deve manter o valor final inalterado ao utilizar um cupom inválido', () => {
            cy.fixture('checkout.json').then((checkoutData) => {
                cy.navigateToCheckoutModal(checkoutData.vehicles.highValue);

                CheckoutModalPage.applyInvalidCouponAndVerifyFinalValue(checkoutData.coupon.invalid);
            });
        });
    });
});